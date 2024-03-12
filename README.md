> ⚠️ This Chrome Extension is no longer functional as Axie Infinity marketplace has been revamped as of 05 May 2022 - *read blog post [here](https://blog.axieinfinity.com/p/axie-marketplace-update)*

![](/src/images/banner.png)
# Axie Traits Filter Bookmark - Chrome Extension

## Overview
Axie Market Maker is a Google Chrome Browser Extension developed in React TypeScript to enhance user experience on the [Axie Infinity marketplace](https://app.axieinfinity.com/marketplace/). 

This extension allows users to create & save custom filters such as body parts, classes & stats of an Axie. These saved filters can then be quickly applied to search the Axie marketplace with just a click, saving users time & effort - without having to leave their browser tabs open.

*Note: [Axie Infinity](https://axieinfinity.com/) is a blockchain-based digital pet universe where players collect, breed, and battle fantasy creatures called Axies.*

## Motivation
This extension was created to address a limitation in the Axie marketplace where users had to manually save individual searches or keep browser tabs open for specific searches. 

With the rapid buy / sell activities during the peak of Axie Infinity, having a quick and efficient way to search for Axies with desired traits and stats became essential. Axie Market Maker simplifies this process by enabling users to save and apply custom filters effortlessly.

## Features
🛟 **Custom Filters**: Users can easily create custom filters by selecting Axie attributes. Users can save it for future use.
* **Body Parts**: 36 Back Parts | 36 Horn Parts | 24 Mouth Parts | 36 Tail Parts
* **Axie Classes**: 9 Classes <img src="src/images/classes/class_aquatic.svg" width="12"/><img src="src/images/classes/class_beast.svg" width="12"/><img src="src/images/classes/class_bird.svg" width="12"/><img src="src/images/classes/class_bug.svg" width="12"/><img src="src/images/classes/class_dawn.svg" width="12"/><img src="src/images/classes/class_dusk.svg" width="12"/><img src="src/images/classes/class_mech.svg" width="12"/><img src="src/images/classes/class_plant.svg" width="12"/><img src="src/images/classes/class_reptile.svg" width="12"/>
* **Stats**: 4 Stats (27-61 Pts) <img src="src/images/stats/Health-2.svg" height="10"/> <img src="src/images/stats/Speed-2.svg" height="10"/> <img src="src/images/stats/Skill-2.svg" height="10"/> <img src="src/images/stats/Morale-2.svg" height="10"/>
* **Breed**: Number of times the Axie has been bred <img src="src/images/stats/Breed-2.svg" height="10"/>

🔍 **Quick Automated Searches**: Saved filters can be quickly applied to search the Axie marketplace with just a click by utilizing DOM evaluator to automate the process, saving users from manual input.

🗂️ **Filter Saving**: Filters are saved in user's local storage to ensure persistence across sessions.

## Installation
1. Clone the repository
2. Run build
```
npm run build
```
3. Open Chrome and go to `chrome://extensions`.
4. Enable `Developer Mode` in the top right corner
5. Click on `Load Unpacked` & select the `build` folder
6. Hooray! The extension is ready for use 😎
7. (Optional) Pin the extension to use it quickly

## Usage
1. Click on the Axie Market Maker icon in the Chrome toolbar to open the extension.
2. Go to the `Setup` tab & createa a custom filter by selecting the desired Axie attributes.
3. Save the filter for future use.
4. To apply a save filter, go to [Axie Infinity marketplace](https://app.axieinfinity.com/marketplace/) & simply click on any of your filters.
5. Sit back, relax & watch your the extension automatically enter the selected filter into the marketplace & initiate the search!

---
*By utilizing the Axie Market Maker extension, users can streamline their Axie marketplace experience, saving time and effort while navigating the dynamic world of Axie Infinity. Happy Axie hunting! 🎮🦊*