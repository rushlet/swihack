# Made to Measure
Play with the tool at [rushlet.github.io/swihack](rushlet.github.io/swihack)

## What is it?
A tool for providing contextual examples of different units of measurements, relevant to different cultures and languages. 

For example, in an English version of an article discussing volumes of liquids, we might equivocate the amount to pints of beer, but this isn't appropriate for audiences all over the globe. In Arabic countries, for instance, it may be more appropriate to use glasses of water.

### Why?
Publishing a visual story in different languages is not limited to translating text or flipping it to be read right to left. There are cultural, visual nuances particular to each audience that need to be addressed from the technical, design and editorial perspectives.

This is a product of the #SwiHack Multilingual Hackathon. For a full description of how we created the tool, [read our blog post](#);

## How to contribute
To make this as useful tool as possible, we'll need to keep adding to our dataset and image library - which will rely on contributions from people from different countries and native speakers. To this end, we have made the project open source, so anyone can contribute to it. If there's something you want to see added to the tool, you can get involved.

If you want to add some examples, some new units of measurements or types of measurement (so far we have area, volume, height and weight but there are so many more!) that would be brilliant. 

To do this, you will need to fork this GitHub repository and make changes, then open a pull request which will be reviewed and then merged in. Once it is merged in, the project will be rebuilt and redeployed.

###  To add a new example
If you want to add a new example/unit/type you will need to update the JSON dataset in `./src/measures_swihack.json`.

If you are adding a new example, you will also need to add an image of it in `./src/assets/img`. Ideally this would be 500px x 500px.
