$(document).ready(function(){
	$('#addDiv').on('click', function(){
		new Div()
	})

	$('#addButton').on('click', function(){
		new Button()
	})
})

var eventTypes = ['click','hover','dblclick','mouseenter']

//this object will be used in formulas to reference values/properties of formulas and whatnot
//need to store all of those properties as functions, so the retrieved value will always be up-to-date.
var elem = {}

//just for convenience - this broke jQuery when I put it on the Object.prototype.
function forEach2 (obj,cb) {
	for(var key in obj) {
		cb(obj[key],key,obj)
	}
}

var Element = function(id){
	//will eventually pass in objects/properties for when we reconstruct the DOM based on uploaded .js files with cache objects.

	count.increment()

	var id = id || 'element' + count.get()

	this.events = {};

	(function buildEvents() {
		eventTypes.forEach((function(event) {

			//create events array for each event type
			this.events[event] = [];

			//add callback/trigger for each event type
			addTrigger.call(this,event)

			//attach listeners for each event type 
			addJQueryEvent.call(this,event,id);

		}).bind(this))

	}).call(this);

	function addJQueryEvent(event,id) {
		$(document).on(event,'#'+id,(function(){this[event]()}).bind(this))
	}

	function addTrigger(event) {
		this[event] = function() {
			this.events[event].forEach(function(func){
				func()
			})
		};
	}

	function removeJQueryEvent(event,oldID) {
		$(document).off(event,'#'+oldID,(function(){this[event]()}).bind(this))
	}

	this.addEvent = function(eventType,func) {
		this.events[eventType].push(func)
	}

	this.rename = function(id) {
		var oldID = this.DOMElement.attr('id')

		eventTypes.forEach((function(event) {
			removeJQueryEvent.call(this,event,oldID)
			addJQueryEvent.call(this,event,id)
		}).bind(this))

		this.DOMElement.attr('id',id)

		this.menuEntry.children(':first').text(id)
		//need to account for elem object
	}

	//to-do list:
	// format menu entries
	// 	with drop-downs for each css property
	// figure out how to fetch value or css property by default

	this.styles = this.styles || {}
	this.DOMElement.attr('id',id).css(this.styles)
	$('.container').append(this.DOMElement)

	MenuEntry.call(this,id)

	//need to account for elem object
}

var Div = function(id) {

	//some elements need default styles.  we also need to store these for later use.
	this.styles = {
		'height': '50px',
		'width': '50px',
		'border-style':'solid',
		'border-color':'black'
	}

	this.DOMElement = $('<div>')

	Element.call(this,id)
}

var Button = function(id) {

	this.styles = {
		'height': '21px',
		'width': '65px'
	}

	this.DOMElement = $('<button>').text('Button '+(count.get()+1))

	Element.call(this,id)
}

var count = (function() {
	//can we cache the element count somehow for future use? - probably have an object 'cache' that, when people upload files, just resets the value of the object.  cache will contain an array of Element objects used to reconstruct the DOM and menu, count value, etc.
	var num = 0
	return {
		get: function() {
			return num
		},
		increment: function() {
			++num
		},
		add: function() {
			return ++num
		}
		//might need to add a 'set' method, for when we import that cache object.
	}
})()

var MenuEntry = function(id) {
	var menuStyles = {
		'width':'initial',
		'height':'auto',
		'margin': '4px',
		'border-style':'solid',
		'border-color':'black',
		'background-color':'lightgreen'
	}

	this.menuEntry = $('<div>').css(menuStyles).append($('<div>').text(id))
		//only works when you click the title div - can't see a reason to apply this to the entire menu entry.
		.on('click', ':first-child', function(e){
			$(this).siblings().slideToggle()
		})

	forEach2(this.styles,(function(styleValue,styleName) {
		StyleInput.call(this,styleName,styleValue)
	}).bind(this))

	$('.menu').append(this.menuEntry)
}

var MenuInput = function() {
	this.DOMInput = $('<div>').css(this.inputStyles).append(this.label,this.input)
	this.menuEntry.append(this.DOMInput)
}

var StyleInput = function(property,value) {

	this.inputStyles = {
		'width':'initial',
		'margin':'2px',
		'background-color':'lightyellow'
	}

	this.label = $('<div>').text(property+':').css('margin','1px')

	this.input = $('<input>').val(value).css({'margin':'1px','margin-top':0})

	$(this.input).on('change',(function(e){
		var newValue = $(e.target).val()
		this.DOMElement.css(property,newValue)
		this.styles[property] = newValue
	}).bind(this))

	MenuInput.call(this)

	// this.menuEntry.append(this.DOMInput) - moved to MenuInput generator
}

//for eventual use
var EventInput = function() {

}
