# AeroBMSCE_TASK_REPO
AeroBMSCE Website (Recruitment Task)
A rebuilt, dark and techy website for AeroBMSCE, the aerospace and UAV club of BMS College of Engineering. It is a fix and redesign of the intentionally broken starter site, built with plain HTML, CSS and JavaScript (no frameworks, no backend)

1.Flaws of the original website
 -> A broken link: The home page linked to contact.html, but that file didn't exist in the repo.
 -> Inconsistent navigation: The home page had five nav links, while the other pages had three, in a different order.Moving between      pages felt like moving between different sites.
 -> Missing pages: There was no dedicated "Who We Are" or "What We Build" page. That content was scattered across the home page and the partners page, and the achievements were on a page called "Journey".
 -> Content was scattered: Club details were spread over several pages with no clear structure.

2.Designing the UI/UX
->Direction: dark and techy, to match what the club does (aircraft, drones, autonomy). The look is meant to feel like a flight instrument panel or an engineering blueprint.
->Typography: Chakra Petch for headings and navigation, because its squared shapes feel technical, and IBM Plex Sans for body text, because it stays readable at small sizes on dark backgrounds.

3.Problems
->After renaming journey.html to achievements.html pages that still pointed at the old names lost their styling.
->I searched the whole project for the old file names (Ctrl+Shift+F in VS Code) to find every place they were used.
->I made the navbar the same on every page so that one set of names was used everywhere.
->I checked the live site, not just my local copy, because file name capitalization matters on GitHub Page.

Tools used:
HTML, CSS, vanilla JavaScript, Google Fonts (Chakra Petch, IBM Plex Sans). AI assistance (Claude) was used to help generate and explain the code, in line with the task rules. I customized the design and reviewed the code to understand how it works.