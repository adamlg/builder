
## Overview

Builder is a GUI for basic HTML development and styling.  Without writing any code, users can create divs and buttons and do some basic formatting.  This started out as a fun way to practice OOP, so if you want to learn more about that take a look at the code in classes.js.

## Usage

Open view.html in your browser, and click the buttons to add elements to the page.  You can then change values in the menu (make sure it's a valid CSS value!) to change the formatting of each element.

## Current Limitations

There are methods for binding functions to each element, but I haven't designed the GUI for those functions yet.  You can test it in the console with code that looks something like this:

	var a = new Div()
	a.addEvent('click', function(){alert 'clicked!'})

...and then click on the div that you created to trigger that function.  Current events are click, hover, double-click, and mouseenter, and any others can be added by updating the eventTypes array.  Right now, the only element types that can be added are buttons and divs, but that's in progress as well.

##To-dos (i.e. wish list):

* GUI for binding functions
* Other element types
* Other event types
* Export/save created HTML and JS
* Improve design (or really, add any design at all)
* Add other CSS options in element menu
* Expose option to rename element (available already if you pass a string into Div() or Button() in the console)
* Error handling for invalid CSS values

## Contributing

There's no formal process at the moment, so just add issues or make a pull request.  Any feedback or contributions are much appreciated.  
