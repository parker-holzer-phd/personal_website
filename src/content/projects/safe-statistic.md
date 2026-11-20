---
title: "SAFE: separating stellar activity from planet signals"
description: "A statistical indicator and reproducible research code for identifying stellar activity in exoplanet radial-velocity surveys."
tags: ["Statistics", "Research", "Astrostatistics"]
draft: false
sample: false
status: "Public repository"
featured: false
order: 4
role: "Researcher and first author"
technologies: ["Python", "R", "Hypothesis testing", "Simulation"]
image: "/images/projects/safe.webp"
imageWidth: 900
imageHeight: 700
imageAlt: "Comparison of statistical power for SAFE and other stellar-activity indicators across simulated activity levels."
imageCaption: "Original comparison plot from the SAFE research repository."
imageSource: "https://github.com/parkerholzer/safe_statistic/blob/master/SimulationStudies/SAFE_vs_others/StellarActivity_Comp.png"
links: [{"label": "GitHub repository", "url": "https://github.com/parkerholzer/safe_statistic"}]
---
## The question

A star’s own activity can distort its spectrum and complicate the search for orbiting planets. How can we identify that activity when interpreting radial-velocity observations?

## The approach

The Stellar Activity F-statistic for Exoplanet surveys (SAFE) is designed to flag changes in stellar spectra associated with activity. The repository contains methodology, simulation studies, and applications to EXPRES observations.

## Research and software

I am the first author of the [SAFE paper](https://doi.org/10.3847/1538-3881/abf5e0), published in *The Astronomical Journal* in 2021. The linked code supports the paper’s experiments; the methodology is also available in [rvmethod](/projects/r-package/).

The figure above comes directly from the repository. It compares indicator performance under the paper’s simulation conditions, rather than promising performance for every star.
