---
title: rvmethod
description: An open-source R package implementing statistical methods for estimating stellar radial velocities and detecting exoplanets.
tags: [R, Software, Astrostatistics]
draft: false
sample: false
status: Published R package
featured: true
order: 3
role: Package author
technologies: [R, Linear regression, Statistical computing]
visual: package
image: "/images/projects/hgrv.webp"
imageWidth: 800
imageHeight: 400
imageAlt: "Radial-velocity measurements of 51 Pegasi plotted against orbital phase with a fitted periodic curve."
imageCaption: "51 Pegasi results from the HGRV research implemented in rvmethod."
imageSource: "https://github.com/parkerholzer/hgrv_method/blob/master/51Pegasi/HGRV_51Peg_rvs.png"
links:
  - label: CRAN package
    url: https://CRAN.R-project.org/package=rvmethod
  - label: Package manual
    url: https://cran.r-universe.dev/rvmethod/rvmethod.pdf
  - label: Related paper
    url: https://doi.org/10.1214/20-AOAS1406
---
## The problem

Make the Hermite–Gaussian radial velocity approach available as reusable statistical software for exoplanet research.

## My role

I authored and published rvmethod during my doctoral research at Yale University.

## The approach

The package supports a workflow for estimating a template stellar spectrum, identifying absorption features, fitting Gaussian profiles, and applying the Hermite–Gaussian radial velocity method with linear regression. The [package manual](https://cran.r-universe.dev/rvmethod/rvmethod.pdf) documents the functions and examples.

## Reach and research

As of November 16, 2026, rvmethod had 15,813 reported installations.

The associated [research paper](https://doi.org/10.1214/20-AOAS1406) describes the method and its evaluation.
