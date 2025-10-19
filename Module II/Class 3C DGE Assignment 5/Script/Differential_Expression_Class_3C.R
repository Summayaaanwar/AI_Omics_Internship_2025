
# ---------------------------------------------------------------------
#             Module II: Introduction to Genomics Data Analysis
# ---------------------------------------------------------------------
#                     Microarray Data Analysis
# =====================================================================

# Topics:
# 1. Probe IDs to gene mapping
# 2. Differential Gene Expression Analysis
# 3. Data Visualization


gc()  # Clear memory to free up space before analysis

#### Install and Load Required Packages ####
# Check if BiocManager is installed; install if missing
if (!requireNamespace("BiocManager", quietly = TRUE))
  install.packages("BiocManager")

# Install Bioconductor packages required for microarray analysis
BiocManager::install(c("limma", "AnnotationDbi", "hgu133plus2.db"))

# Each microarray platform has its own annotation package. 
# For example, for the Affymetrix Human Genome U133 Plus 2.0 Array, 
# the package name is 'hgu133plus2.db'.
# Find the appropriate annotation package for your platform 
# (e.g., hgu133a.db, hugene10sttranscriptcluster.db, etc.)
# and install/load it accordingly.

# Install CRAN packages for data manipulation and visualization
install.packages(c("dplyr", "tibble", "ggplot2", "pheatmap"))

# Load Bioconductor packages
library(AnnotationDbi)   # Handles annotation and probe–gene mapping
library(hgu133plus2.db)  # Annotation database for Affymetrix HG-U133 Plus 2.0 array
library(limma)           # Performs linear modeling and differential expression
library(dplyr)           # Simplifies data manipulation tasks
library(tibble)          
library(ggplot2)         # Used for plotting and visualization
library(pheatmap)        # Generates heatmaps for gene expression data

# Note: dplyr and ggplot2 belong to the tidyverse collection

# -------------------------------------------------------------
#### Probe-to-Gene Mapping using AnnotationDbi ####
# -------------------------------------------------------------

# Load preprocessed expression and phenotype data
#load("GSE20711.RData")
load("E:/Github/AI_Omics_Internship_2025/Module II/Class 3B QC & Normalizaton Assignment 4/Processed/GSE20711.RData")


# Alternative annotation resources include:
# Ensembl Genome Browser and DAVID Functional Annotation Tool

# check annotation slot of your dataset
annotation(raw_data)

raw_data

# Display objects available in the annotation package
ls("package:hgu133plus2.db")

columns(hgu133plus2.db)
keytypes(hgu133plus2.db)

# Example of organism-specific annotation packages:
# org.Hs.eg.db for human
# org.Mm.eg.db for mouse

# -------------------------------------------------------------
# Extract probe IDs from processed microarray data
# -------------------------------------------------------------
probe_ids <- rownames(processed_data)

# Map probe IDs to gene symbols using the platform annotation database
gene_symbols <- mapIds(
  hgu133plus2.db,          # Database used for mapping
  keys = probe_ids,        # Input probe IDs
  keytype = "PROBEID",     # Probe ID key type
  column = "SYMBOL",       # Desired annotation column (gene symbols)
  multiVals = "first"      # Return first match if multiple exist
)

# Convert mapping to a data frame and rename columns
gene_map_df <- gene_symbols %>%
  as.data.frame() %>%
  tibble::rownames_to_column("PROBEID") %>%
  dplyr::rename(SYMBOL = 2)

# -------------------------------------------------------------
# Handle multiple probes mapping to a single gene
# -------------------------------------------------------------
# Several strategies exist:
# 1. Retain probe with highest expression or variance
# 2. Average or summarize probe signals
# 3. Remove duplicate probes to maintain one row per gene

# Summarize number of probes per gene symbol
duplicate_summary <- gene_map_df %>%
  group_by(SYMBOL) %>%
  summarise(probes_per_gene = n()) %>%
  arrange(desc(probes_per_gene))

# Identify genes associated with multiple probes
duplicate_genes <- duplicate_summary %>%
  filter(probes_per_gene > 1)

sum(duplicate_genes$probes_per_gene)

# -------------------------------------------------------------
# Merge annotation mapping with expression data
# -------------------------------------------------------------

# Verify if probe IDs in mapping correspond to expression data
all(gene_map_df$PROBEID == row.names(processed_data))

# Merge annotation (SYMBOL) with expression matrix
processed_data_df <- processed_data %>%
  as.data.frame() %>%
  tibble::rownames_to_column("PROBEID") %>%
  dplyr::mutate(SYMBOL = gene_symbols[PROBEID]) %>%
  dplyr::relocate(SYMBOL, .after = PROBEID)

# Remove probes without valid gene symbol annotation
processed_data_df <- processed_data_df %>%
  dplyr::filter(!is.na(SYMBOL))

# Select only numeric expression columns
expr_only <- processed_data_df %>%
  dplyr::select(-PROBEID, -SYMBOL)

# -------------------------------------------------------------
# Collapse multiple probes per gene using average expression
# -------------------------------------------------------------
# limma::avereps() computes the average for probes representing the same gene
averaged_data <- limma::avereps(expr_only, ID = processed_data_df$SYMBOL)

# Example to demonstrate how avereps works
x <- matrix(rnorm(8*3), 8, 3)
colnames(x) <- c("S1", "S2", "S3")
rownames(x) <- c("b", "a", "a", "c", "c", "b", "b", "b")
head(x)
avereps(x)  # Collapses duplicated row names by averaging

dim(averaged_data)

# Convert averaged expression data to matrix format
data <- as.data.frame(averaged_data)
data <- data.matrix(data)
str(data)        # Structure check
is.numeric(data) # Confirm numeric matrix

# -------------------------------------------------------------
#### Differential Gene Expression Analysis ####
# -------------------------------------------------------------

# Define sample groups based on phenotype data
# Adjust group labels according to dataset annotation
groups <- factor(phenotype_data$source_name_ch1,
                 levels = c("Normal breast tissue", "Breast tumor"),
                 label = c("normal", "cancer"))

class(groups)
levels(groups)


# -------------------------------------------------------------
# Create design matrix for linear modeling
# -------------------------------------------------------------
# Using no intercept (~0 + groups) allows each group to have its own coefficient
design <- model.matrix(~groups)
colnames(design) <- levels(groups)

design <- model.matrix(~0 + groups)
colnames(design) <- levels(groups)

# Fit linear model to expression data
fit_1 <- lmFit(data, design)

# Define contrast to compare cancer vs normal samples
contrast_matrix <- makeContrasts(cancer_vs_normal = cancer - normal,
                                 levels = design)
# cancer- normal =B1-B0

# Apply contrasts and compute moderated statistics
fit_contrast <- contrasts.fit(fit_1, contrast_matrix)

fit_2 <- eBayes(fit_contrast)

# -------------------------------------------------------------
# Extract list of differentially expressed genes (DEGs)
# -------------------------------------------------------------
deg_results <- topTable(fit_2,
                        coef = "cancer_vs_normal",  # Specify contrast of interest
                        number = Inf,               # Return all genes
                        adjust.method = "BH")       # Benjamini-Hochberg correction

# -------------------------------------------------------------
# Classify DEGs into Upregulated, Downregulated, or Not Significant
# -------------------------------------------------------------
deg_results$threshold <- as.factor(ifelse(
  deg_results$adj.P.Val < 0.05 & deg_results$logFC > 1, "Upregulated",
  ifelse(deg_results$adj.P.Val < 0.05 & deg_results$logFC < -1, "Downregulated",
         "No")
))

# Subset genes by regulation direction
upregulated <- subset(deg_results, threshold == "Upregulated")
downregulated <- subset(deg_results, threshold == "Downregulated")

# Combine both sets of DEGs
deg_updown <- rbind(upregulated, downregulated)


# Base path (use forward slashes in R)
base_out <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5"

# Create output folders
dir.create(file.path(base_out, "Results"),      showWarnings = FALSE, recursive = TRUE)
dir.create(file.path(base_out, "Result_Plots"), showWarnings = FALSE, recursive = TRUE)
dir.create(file.path(base_out, "Processed"),    showWarnings = FALSE, recursive = TRUE)

# Write CSVs
write.csv(deg_results,   file = file.path(base_out, "Results", "DEGs_Results.csv"),        row.names = TRUE)
write.csv(upregulated,   file = file.path(base_out, "Results", "Upregulated_DEGs.csv"),     row.names = TRUE)
write.csv(downregulated, file = file.path(base_out, "Results", "Downregulated_DEGs.csv"),   row.names = TRUE)
write.csv(deg_updown,    file = file.path(base_out, "Results", "Updown_DEGs.csv"),          row.names = TRUE)

cat("Saved to:\n",
    file.path(base_out, "Results", "DEGs_Results.csv"),        "\n",
    file.path(base_out, "Results", "Upregulated_DEGs.csv"),     "\n",
    file.path(base_out, "Results", "Downregulated_DEGs.csv"),   "\n",
    file.path(base_out, "Results", "Updown_DEGs.csv"),          "\n", sep = "")


###write.csv(deg_results, file = "Results/DEGs_Results.csv")
###write.csv(upregulated, file = "Results/Upregulated_DEGs.csv")
###write.csv(downregulated, file = "Results/Downregulated_DEGs.csv")
###write.csv(deg_updown, file = "Results/Updown_DEGs.csv")


# -------------------------------------------------------------
#### Data Visualization ####
# -------------------------------------------------------------

# -------------------------------------------------------------
# Volcano Plot: visualizes DEGs by logFC and adjusted p-values
# -------------------------------------------------------------
# Note: x-axis = log2 fold change, y-axis = -log10 adjusted p-value


# Ensure output folder exists
plot_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5/Result_Plots"
dir.create(plot_dir, showWarnings = FALSE, recursive = TRUE)

# Build the same plot
p <- ggplot(deg_results, aes(x = logFC, y = -log10(adj.P.Val), color = threshold)) +
  geom_point(alpha = 0.7, size = 2) +
  scale_color_manual(values = c("Upregulated" = "red",
                                "Downregulated" = "blue",
                                "No" = "grey")) +
  theme_minimal() +
  labs(title = "Volcano Plot of Differentially Expressed Genes",
       x = "log2 Fold Change",
       y = "-log10(P-value)",
       color = "Regulation")

# Save to PNG 
ggplot2::ggsave(
  filename = file.path(plot_dir, "volcano_plot.png"),
  plot = p,
  width = 2000/300, height = 1500/300, dpi = 300, units = "in"
)

# -------------------------------------------------------------
# Heatmap of Top Differentially Expressed Genes
# -------------------------------------------------------------

# Select top genes with smallest adjusted p-values
top_genes <- head(rownames(deg_updown[order(deg_updown$adj.P.Val), ]), 10)

# Subset averaged expression matrix for selected genes
heatmap_data <- data[top_genes, ]

# Generate unique column names per sample group for display
group_char <- as.character(groups)
heatmap_names <- ave(group_char, group_char, FUN = function(x) paste0(x, "_", seq_along(x)))

# Assign formatted names to heatmap columns
colnames(heatmap_data) <- heatmap_names


# Save THIS heatmap to your folder (no device juggling)
plot_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5/Result_Plots"

### Generate heatmap without additional scaling

pheatmap(
  heatmap_data,
  scale = "none",            # for already normalized data
  cluster_rows = FALSE,      
  cluster_cols = TRUE,
  show_rownames = TRUE,
  show_colnames = TRUE,
  color = colorRampPalette(c("blue", "white", "red"))(100),
  fontsize_row = 6,
  fontsize_col = 8,
  main = "Top 10 Differentially Expressed Genes",
  filename = file.path(plot_dir, "heatmap_top10_DEGs.png")   # << save here
)

#save all results 
out_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5/Processed"
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

save(
  raw_data, normalized_data, processed_data, phenotype_data, feature_data, expression_data,
  averaged_data, data, groups, design, fit_1, fit_2, deg_results, upregulated, downregulated, deg_updown,
  file = file.path(out_dir, "DGE_Assignment5_Objects.RData")
)

cat("Saved objects to:\n", file.path(out_dir, "DGE_Assignment5_Objects.RData"), "\n", sep = "")

writeLines(capture.output(sessionInfo()),
           file.path(out_dir, "sessionInfo.txt"))

# sanity check:
ls()  # objects restored into your workspace
# How to load later 
load("E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5/Processed/DGE_Assignment5_Objects.RData")

# Save THIS heatmap to your folder (no device juggling)
plot_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5/Result_Plots"

### Generate heatmap without additional scaling

pheatmap(
  heatmap_data,
  scale = "none",            # for already normalized data
  cluster_rows = FALSE,      
  cluster_cols = TRUE,
  show_rownames = TRUE,
  show_colnames = TRUE,
  color = colorRampPalette(c("blue", "white", "red"))(100),
  fontsize_row = 6,
  fontsize_col = 8,
  main = "Top 10 Differentially Expressed Genes",
  filename = file.path(plot_dir, "heatmap_top25_DEGs.png")   # << save here
)


# gene_map_df with columns: PROBEID, SYMBOL

# 1) How many probes map to each gene?
duplicate_summary <- gene_map_df |>
  dplyr::group_by(SYMBOL) |>
  dplyr::summarise(probes_per_gene = dplyr::n(), .groups = "drop") |>
  dplyr::arrange(dplyr::desc(probes_per_gene))

# 2) Genes with >1 probe
n_genes_multi_probe <- sum(duplicate_summary$probes_per_gene > 1)

# 3) Total “extra” probe rows beyond one per gene (i.e., duplicates)
n_extra_probe_rows <- sum(pmax(duplicate_summary$probes_per_gene - 1, 0))

# 4) Quick console summary
cat(
  "Genes with >1 probe: ", n_genes_multi_probe, "\n",
  "Extra probe rows beyond one per gene: ", n_extra_probe_rows, "\n",
  "Max probes for any one gene: ", max(duplicate_summary$probes_per_gene), "\n",
  sep = ""
)

# (Optional) See the most duplicated genes
head(duplicate_summary, 10)




# save the file 
# Set where to save
ws_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 3C DGE Assignment 5/Processed"
dir.create(ws_dir, recursive = TRUE, showWarnings = FALSE)

# Save the entire workspace to a single .RData file
save.image(file = file.path(ws_dir, "workspace_all.RData"))

#--------------------
#### Assignment #### 
#--------------------

#        Map probe IDs to gene symbols using AnnotationDbi
#        i.  Find the appropriate annotation package for your platform and use it
#        Ans: GEO platform: GPL570 – Affymetrix Human Genome U133 Plus 2.0 Array

#        Correct Bioconductor package: hgu133plus2.db

#        ii. Check how many probes map to the same gene and handle duplicates

# Perform differential gene expression analysis using the Limma package
# Create a volcano plot showing upregulated and downregulated genes
# Generate a heatmap of the top 25 DEGs
# Save DEG results (complete, upregulated, downregulated) as CSV files
# Export both plots as PNG images in the Results folder

# Write a short result summary (4–5 lines) explaining 
#        i.   how multiple probes can map to the same gene, how you handled duplicate probes,
#        ii.  Which contrast or comparison did you perform (e.g cancer_vs_normal, diabetes_vs_normal etc)
#        iii. and summarize how many genes were upregulated and downregulated based on your DEG results.

# Submission Instructions:

# Upload your R script implementing the workflow to GitHub and 
# provide the repository link in the form.

# Google Form: https://forms.gle/uoWoyukG2KHUQkRm9

# Deadline: Sunday 19th October, 2025 (Midnight)

