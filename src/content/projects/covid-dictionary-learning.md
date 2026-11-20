---
title: "Finding shared patterns in COVID-19 cases"
description: "Dictionary learning applied to case-count time series to explore common patterns across U.S. states and territories."
tags: ["Machine learning", "Time series", "Data exploration"]
draft: false
sample: false
status: "Public repository"
featured: false
order: 5
role: "Project author"
technologies: ["Python", "R", "Dictionary learning", "Jupyter"]
image: "/images/projects/covid.webp"
imageWidth: 640
imageHeight: 480
imageAlt: "Four dictionary-learning components showing shared temporal patterns in historical COVID-19 case counts."
imageCaption: "Original dictionary-learning component plot from the project."
imageSource: "https://github.com/parkerholzer/COVID19_dictionary_learning/blob/main/COVID19-dictlearning_components.png"
links: [{"label": "GitHub repository", "url": "https://github.com/parkerholzer/COVID19_dictionary_learning"}]
---
## The question

Can a small set of shared temporal patterns help describe how reported COVID-19 cases evolved across U.S. states and territories?

## The approach

The project applies dictionary learning to historical case-count time series, expressing regional patterns through a set of components. The repository includes the data-retrieval script, a Jupyter notebook, an exported HTML analysis, and the component visualization shown above.

## Scope

This is an exploratory analysis of historical reported cases. The components summarize patterns in that dataset; they are not forecasts or causal explanations of the pandemic.
