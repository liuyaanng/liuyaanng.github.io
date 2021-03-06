---
title: Playing Atari with Deep Reinforcement Learning
top: false
cover: false
toc: true
mathjax: true
hidden: true
date: 2020-03-03 10:29:11
updatedate: 2020-03-03 10:29:11
img:
password:
summary: Note
tags:
- Deep Reinforcement Learning
categories:
- Paper Notes


---

## Abstract

This is the first deep learning model using reforcement learning to learn contorl policies ditectly from high-dimensional sensory input. The model is a **convolutional neural network** , trained with a bariant of Q-Learning.

Input: raw pixels    
Output: a alue function estimating future reawards

### 1. Introduction

- Learning tp control agents directly **from high-dimensional sensory input** like vision and speech is one of the long-standing challenges of RL
- Deep learning have made it possible to extract hig-level features from raw sensory data. The neural network architrctures including **recurrnet neural network**, **multilayer perceptrons**, **restricted Boltzmann machines and recurrent neural networks**, and have ex-ploited both **supervised** and **unsupervised learning**.
- RL algorithms must be able to learn from a **scalar reward signal that is frequently space, noisy and delayed.**
- The network is trained with a variant of Q-learning algorithm, with stochastic gradirnt **descent** to update the weights.
- Arcade Learning Enviroment: Atari 2600 presents agents with a high dimensional visualimput(210x160RGB video at 60Hz)
- The goal is to create a single neural network agent that is able to successfully learn to play as many of the game as possible.

### 2. Background
- The Programe

  - Environment $\mathcal{E}$ may be stochastic.
  - Atari emulator: a sequence of **actions, observations, rewards**
  - Each time-step the agent selects an action $a_t$
  - The emulator's internal state observers an image $x_t \in\mathbb{R}^{d}$ ,  which is a **vector of raw pixel values representing the current screen**
  - The emulator receives a reward $r_t$ representing the change in game score.





