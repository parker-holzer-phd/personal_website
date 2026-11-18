---
title: Exoplanet radial-velocity estimation
description: A Hermite–Gaussian approach that turns stellar Doppler-shift estimation into a linear regression problem.
tags: [Statistics, Research, Astrostatistics]
draft: false
sample: false
status: Published 2021
featured: true
order: 2
role: Doctoral researcher and first author
technologies: [R, Python, Linear regression, Hermite–Gaussian functions]
visual: model
links:
  - label: Published paper
    url: https://doi.org/10.1214/20-AOAS1406
  - label: Research code
    url: https://github.com/parkerholzer/hgrv_method
  - label: Preprint
    url: https://arxiv.org/abs/2005.14083
---
## The problem

Detecting an exoplanet with the radial velocity method depends on measuring very small Doppler shifts in a star's spectrum. The estimation method must account for noise and the relationship between neighboring wavelengths.

## My role

This work grew out of my doctoral research at Yale University. I am the first author of the paper, published in *The Annals of Applied Statistics* in 2021 with Jessi Cisewski-Kehe, Debra Fischer, and Lily Zhao.

## The approach

Hermite–Gaussian functions provide an approximation that reduces Doppler-shift estimation to linear regression in many settings. The method was evaluated through simulations and EXPRES observations of the star 51 Pegasi.

## Results and implementation

The paper reports radial-velocity precision below 0.3 m/s in a simulation study and reductions in root mean squared error of up to 15 cm/s relative to a traditional cross-correlation approach. These figures describe the published experiments, not a general guarantee of performance.

The method is implemented in the R package [rvmethod](/projects/r-package/), with Python research code available in the linked public repository. The [published paper](https://doi.org/10.1214/20-AOAS1406) provides the methods, experiments, and limitations in full.
