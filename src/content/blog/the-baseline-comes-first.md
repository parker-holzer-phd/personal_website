---
title: The baseline comes first
description: "Before reaching for a more complex model, decide what a useful improvement would look like."
pubDate: 2026-11-18
category: Artificial Intelligence
tags: [Machine Learning, Evaluation]
draft: false
sample: true
---
> Sample article. This text demonstrates the website's article layout and is not an account of the owner's experience.

## Start with a reference point

A model's score is easier to interpret when compared with a simple reference. For regression, that reference might predict the training mean for every observation. For classification, it might always predict the most frequent training class.

A baseline establishes a question: does added complexity improve the outcome enough to justify its cost?

## Keep the comparison fair

Use the same evaluation data and metric for the baseline and candidate model. Learn preprocessing parameters from the training data, then apply them to the evaluation data. This helps avoid letting information from the evaluation set influence the model.

A small baseline can be expressed without a modeling library:

```python
training_targets = [3.0, 5.0, 7.0]
training_mean = sum(training_targets) / len(training_targets)

def predict_baseline(number_of_examples):
    return [training_mean] * number_of_examples
```

## Ask what better means

A smaller average error is only one possible goal. Interpretability, latency, maintenance, and errors on important subgroups may also matter. State the practical criterion before making the system more complicated.

The next useful step is a clear comparison, accompanied by a description of the conditions under which it holds.
