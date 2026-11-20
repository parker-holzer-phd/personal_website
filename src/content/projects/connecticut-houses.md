---
title: "What can a house description tell us?"
description: "Topic modeling and regression to explore whether listing descriptions add information beyond a home’s physical characteristics."
tags: ["NLP", "Statistics", "Housing"]
draft: false
sample: false
status: "Public repository"
featured: true
order: 2
role: "Project author"
technologies: ["Python", "Topic modeling", "Linear regression", "Jupyter"]
image: "/images/projects/connecticut.webp"
imageWidth: 432
imageHeight: 288
imageAlt: "Overlaid residual distributions for Connecticut housing models with and without listing descriptions."
imageCaption: "Original residual comparison from the Connecticut housing analysis."
imageSource: "https://github.com/parkerholzer/ConnecticutHouses/blob/main/topicmodel_resids.png"
links: [{"label": "GitHub repository", "url": "https://github.com/parkerholzer/ConnecticutHouses"}]
---
## The question

Can the words in a real-estate listing tell us something about a home’s price that square footage, lot size, bedrooms, bathrooms, and year built do not?

## The approach

This exploration uses an early-2021 Connecticut housing dataset. The notebook cleans listing descriptions, turns the text into topic distributions, and adds those features to regression models alongside the property characteristics.

It compares models with and without description features and explores topic counts with cross-validation, AIC, and BIC.

## Reading the result

The original residual plot above compares models with and without descriptions. This is a historical, exploratory analysis of one dataset; it does not establish that changing a description causes a change in price. The notebooks preserve the analysis and its model-selection discussion.
