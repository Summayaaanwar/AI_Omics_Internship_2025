# 1. Set Working Directory
# Create a new folder on your computer "AI_Omics_Internship_2025".

getwd()

# 2. Create Project Folder

# In RStudio, create a new project named "Module_I" in your "AI_Omics_Internship_2025" folder.

# Inside the project directory, create the following subfolders using R code:
# raw_data, clean_data, scripts, results or Tasks, plots etc

dir.create("raw_data")
dir.create("clean_data")
dir.create("scripts")
dir.create("results")
dir.create("plots")

#3. Download "patient_info.csv" dataset from GitHub repository

# load the dataset into your R environment
View(patient_info)

# Inspect the structure of the dataset using appropriate R functions
str(patient_info)

# Identify variables with incorrect or inconsistent data types.
# Based on your earlier structure:
# $ gender    : chr        → should be factor
# $ diagnosis : chr        → should be factor
# $ smoker    : chr        → should be factor or logical

# Convert variables to appropriate data types where needed

# Convert 'gender' to factor
patient_info$gender_fac <- as.factor(patient_info$gender)

# Convert 'gender' to numeric (Female = 1, Male = 0)
patient_info$gender_num <- ifelse(patient_info$gender_fac == "Female", 1, 0)

# Convert 'diagnosis' to factor
patient_info$diagnosis_fac <- as.factor(patient_info$diagnosis)

# Optional: Reorder levels (e.g., Normal = 0, Cancer = 1)
patient_info$diagnosis_num <- factor(patient_info$diagnosis_fac,
                                     levels = c("Normal", "Cancer"),
                                     labels = c(0, 1))

# Convert 'smoker' to factor
patient_info$smoker_fac <- as.factor(patient_info$smoker)

#  Reorder levels (e.g., No = 0, Yes = 1)
patient_info$smoker_num <- factor(patient_info$smoker_fac,
                                  levels = c("No", "Yes"),
                                  labels = c(0, 1))

# Create a new variable for smoking status as a binary factor:

# 1 for "Yes", 0 for "No"

# Create a binary factor: 1 = Yes, 0 = No
patient_info$smoker_bin <- as.factor(ifelse(patient_info$smoker == "Yes", 1, 0))


table(patient_info$gender, patient_info$gender_num)
table(patient_info$diagnosis, patient_info$diagnosis_num)
table(patient_info$smoker, patient_info$smoker_num)

View(patient_info)


# Save the cleaned dataset in your clean_data folder with the name patient_info_clean.csv
write.csv(patient_info, file = "clean_data/patient_info_clean.csv")

# Save your R script in your script folder with name "class_Ib"
done
# Save your R workspace with name "YourName_Class_Ib_Assignment.RData"
save.image(file = "Summayya Anwar_Class_Ib_Assignment.RData")

