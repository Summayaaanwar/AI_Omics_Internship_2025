# ---------------------------------------------
# Assignment 2: Differential Gene Expression
# Module_II - AI & Omics Internship 2025
# ---------------------------------------------

# Step 1: Set base directory
base_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 2 R operators Assignmnet 2"

# Step 2: Create Module_II folder

module2_dir <- file.path(base_dir, "Module_II")
dir.create(module2_dir, showWarnings = FALSE)

# Step 3: Create subfolders
dir.create(file.path(module2_dir, "Raw_Data"), showWarnings = FALSE)
dir.create(file.path(module2_dir, "Scripts"), showWarnings = FALSE)
dir.create(file.path(module2_dir, "Results"), showWarnings = FALSE)
dir.create(file.path(module2_dir, "Reports"), showWarnings = FALSE)

# Step 4: Set working directory to Module_II
setwd(module2_dir)
cat("Working directory set to:", getwd(), "\n")

# Step 5: Set input and output directories
input_dir <- file.path(module2_dir, "Raw_Data")
output_dir <- file.path(module2_dir, "Results")

# Step 6: Function to classify genes
classify_gene <- function(logFC, padj) {
  if (!is.na(padj) & padj < 0.05 & logFC > 1) {
    return("Upregulated")
  } else if (!is.na(padj) & padj < 0.05 & logFC < -1) {
    return("Downregulated")
  } else {
    return("Not Significant")
  }
}

# Step 7: Files to process
files_to_process <- c("DEGs_Data_1.csv", "DEGs_Data_2.csv")

# Step 8: Loop to read, process, and save
summary_list <- list()

for (file in files_to_process) {
  # Read data
  filepath <- file.path(input_dir, file)
  data <- read.csv(filepath)
  
  # Replace NA padj with 1
  data$padj[is.na(data$padj)] <- 1
  
  # Apply classification
  data$status <- mapply(classify_gene, data$logFC, data$padj)
  
  # Save processed file
  out_file <- file.path(output_dir, paste0("Processed_", file))
  write.csv(data, out_file, row.names = FALSE)
  
  # Create summary
  summary_table <- table(data$status)
  summary_list[[file]] <- summary_table
  
  # Save summary as CSV
  out_summary_file <- file.path(output_dir, paste0("Summary_", file))
  write.csv(as.data.frame(summary_table), out_summary_file, row.names = FALSE)
  
  # Print summary
  cat("\nSummary for", file, ":\n")
  print(summary_table)
}

# Step 9: Visualization
library(ggplot2)

for (file in files_to_process) {
  summary_file <- file.path(output_dir, paste0("Summary_", file))
  summary_data <- read.csv(summary_file)
  
  colnames(summary_data) <- c("Status", "Count")
  
  p <- ggplot(summary_data, aes(x = Status, y = Count, fill = Status)) +
    geom_bar(stat = "identity") +
    theme_minimal() +
    labs(title = paste("Gene Expression Status -", file),
         x = "Status",
         y = "Number of Genes") +
    scale_fill_manual(values = c("Upregulated" = "red",
                                 "Downregulated" = "blue",
                                 "Not Significant" = "grey"))
  
  # Save plot
  plot_file <- file.path(output_dir, paste0("Barplot_", file, ".png"))
  ggsave(plot_file, plot = p, width = 7, height = 5)
}

# Choose a folder to save into
out_dir <- "E:/Github/AI_Omics_Internship_2025/Module II/Class 2 R operators Assignmnet 2/Module_II/Reports"
dir.create(out_dir, recursive = TRUE, showWarnings = FALSE)

# Save selected objects
rdata_path <- file.path(out_dir, "Assignment2_DGE_Selected.RData")
save(data, summary_list, file = rdata_path)

cat("\nSaved selected objects to:\n", rdata_path, "\n")

