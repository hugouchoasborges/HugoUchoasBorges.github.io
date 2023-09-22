---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: default
style: 
    home

title: Home
---
<div class="home">
    {% include portfolio.html %}
    {% include about.html %}
    {% include experience.html %}
    {% include portfolio-models.html %}

Languages:

{% for lang in site.languages %}
    {% assign lang_name = site.data[lang].l10n.lang_name %}
    {% if lang == site.active_lang %}
{{ lang_name }}
    {% else %}
        {% if lang == site.default_lang %}
<a href=" {{ page.url }}">{{ lang_name }}</a>
        {% else %}
<a href="/{{ lang }}{{ page.url }}">{{ lang_name }}</a>
        {% endif %}
    {% endif %}
{% endfor %}

</div>