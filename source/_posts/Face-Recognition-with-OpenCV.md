---
title: Face Recognition with OpenCV
top: false
cover: false
toc: true
mathjax: false
date: 2019-08-09 12:00:00
password:
summary:
tags:
categories:
---

# Face Recognition with OpenCV

## Image Acquisition and Face Database Creation

### Face Database Creation
The official document provides a download of the face database, and i use the [AT&T Facedatabase](http://www.cl.cam.ac.uk/research/dtg/attarchive/facedatabase.html) to creat my face databse. I have updated this zip file to my github, you can download it from [here](att_faces.zip) faster.
AT&T Face Database is also konwn as the OCR face database, 40 people, 10 photos per person. The photos are token at different times, different lighting, different expressions(closed eyes, laughing or not laughing), diffenent face details(with or without glasses). All images were captured on a dark , eveb background with a vertical face o the front(some with a slight rotation).    
You can download the compressed package from the website, and first extract the att_faces folder. There are 40 folders under the foder, which named from "s1" to "s40". Each folder has the same person's photos with different expressions, and there are 10 face photos.    
The format of these images is ".pgm"

