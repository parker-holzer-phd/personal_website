---
title: Reading a residual plot
description: "A small diagnostic that can reveal where a model's assumptions deserve a closer look."
pubDate: 2026-11-17
category: Statistics
tags: [Modeling, Diagnostics]
draft: false
sample: true
---
> Sample article. This is illustrative writing for the template, not a publication or a description of the owner's research.

## The part left unexplained

A residual is the difference between an observed value and a model's prediction. For observation $i$:

$$
e_i = y_i - \hat{y}_i
$$

Plotting residuals against fitted values can help reveal structure the model has not captured.

## Look for patterns

A curve may suggest a missing nonlinear relationship. A widening spread may suggest that the residual variance changes across the fitted range. Neither pattern alone proves its cause; each suggests a question to investigate.

An isolated large residual deserves context. It may reflect an unusual observation, a data quality issue, or a feature that the current model does not capture.

![Illustrative residual plot with points above and below the zero line.](/images/residuals.svg)

*Illustrative diagram only; these points do not represent an actual study.*

## Use diagnostics together

A residual plot is one view. Combine it with knowledge of the data, validation on suitable held-out observations, and diagnostics appropriate to the model. The purpose is to make limitations visible, not to certify a model from a single chart.
