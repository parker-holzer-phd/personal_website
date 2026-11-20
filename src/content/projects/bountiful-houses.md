---
title: "A closer look at Bountiful home prices"
description: "An R-based exploration of recently sold homes in Bountiful, Utah, using web scraping and multiple regression."
tags: ["Statistics", "Housing", "R"]
draft: false
sample: false
status: "Public repository"
featured: false
order: 6
role: "Project author"
technologies: ["R", "Web scraping", "Multiple regression"]
image: "/images/projects/bountiful.webp"
imageWidth: 547
imageHeight: 401
imageAlt: "Added-variable plot of bedroom count and home price after accounting for other property characteristics."
imageCaption: "Original bedroom added-variable plot from the Bountiful home-price analysis."
imageSource: "https://github.com/parkerholzer/parkerholzer.github.io/blob/master/assets/img/bed_avp.png"
links: [{"label": "GitHub repository", "url": "https://github.com/parkerholzer/Bountiful_houses_sold"}]
---
## The question

How do a home’s characteristics relate to its sale price when we account for them together?

## The approach

The repository contains an R scraping script, a dataset of recently sold Bountiful homes collected from Zillow in March 2021, and a PDF report using linear models to explore their relationships.

The analysis considers bedrooms alongside living area, lot size, bathrooms, and year built, and examines a nonlinear relationship with living area.

## Reading the visualization

The added-variable plot above shows the relationship between bedrooms and price after accounting for other model terms. It describes associations in this historical sample; it is not a current appraisal model or evidence that adding a bedroom lowers a home’s value.
