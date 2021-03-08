---
layout: page
title: projects
permalink: /projects/
description: A growing collection of my personal cool stuff.
nav: true
---

<div class="projects">

  {% assign sorted_projects = site.github.public_repositories | sort: "stargazers_count"|reverse  %}
  {% for project in sorted_projects %}
  <div class="card hoverable mt-2">
    <div class="card-body">
      <h5 class="card-title text-lowercase">
        <a href="{{ project.html_url }}" target="_blank">{{ project.name }}</a>
      </h5>
       <h6 class="card-subtitle mb-2 text-muted">{{project.language}} &bull; <i class="fa fa-star"></i> {{project.stargazers_count}} </h6>
      <p class="card-text">{{ project.description }}</p>
    </div>
  </div>
  {% endfor %}
</div>
