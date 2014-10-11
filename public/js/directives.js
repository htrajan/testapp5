angular.module('app')

.directive('inputFields', function() {
   	return {
    	restrict: 'AE'
    	,
    	scope: {
			fieldInfo: '=fieldInfo'
		}
		,
		template: '<label for="{{ fieldInfo.name }}">{{ fieldInfo.label }}</label>'
					+ '<input numbers-only name="{{ fieldInfo.name }}" id="{{ fieldInfo.name }}" type="{{ fieldInfo.type }}" ng-model="fieldInfo.value" max="{{ fieldInfo.max }}" min="{{ fieldInfo.min }}"/>'
					+ '<span class="error" ng-show="agesForm.input.$error.required">Required!</span>'
					+ '<span class="error" ng-show="agesForm.input.$error.number">Not valid number!</span>'
		,
		link: function(scope, element, attrs) {
			
		}
  	};
})

.directive('selectMultiFields', function($log) {
   	return {
    	restrict: 'AE'
    	,
    	scope: {
			fieldInfo: '=fieldInfo'
		}
		,
		template:
					'<div class="answerSelectionContainer"><div class="answerSelection" ng-repeat="answer in fieldInfo.answers" ><span class="{{ answer.icon.css }}" style="background-image: url(\'{{ answer.icon.img }}\');"></span><br/>'
					+ '<label for="{{ fieldInfo.name }}">{{ answer.label }}</label><br/>'
					+ '<input name="{{ fieldInfo.name }}" value="{{ answer.name }}" id="{{ answer.name }}" type="{{ fieldInfo.type }}"'
					+ ' ng-checked="answer.selected" ng-click="newValue(answer.name)"/></div></div>'
		,
		link: function(scope, element, attrs) {

			$log.log("Starting Value: " +
				scope.fieldInfo.value);

			// removes all selected values from rootscope
			function clearSelectedValues()
			{
				scope.fieldInfo.value = [];
				for (var index in scope.fieldInfo.answers)
			    {
			    	scope.fieldInfo.answers[index].selected = false;
			    }
			}

			scope.newValue = function(value) {

				var element = angular.element( document.querySelector( "#" + value ) )
					selected = element.prop( "checked");

				// radio buttons do not allow for multiple selection
				if (element.attr("type") === "radio")
					clearSelectedValues();

				// update the individual items selected boolean
		     	for (var index in scope.fieldInfo.answers)
			     	if (scope.fieldInfo.answers[index].name === value)
			     		scope.fieldInfo.answers[index].selected = selected;

			    // update the list of selected values
			    if (selected)
			    {
			     	if (scope.fieldInfo.value.indexOf(value) < 0)
			     		scope.fieldInfo.value.push(value);
			    }
			    else
			    {
					var index = scope.fieldInfo.value.indexOf(value);
			     	if (index > -1) {
					    scope.fieldInfo.value.splice(index, 1);
					}
			    }
			}
		}
  	};
})

.directive('selectDropDownFields', function($log) {
   	return {
    	restrict: 'AE'
    	,
    	scope: {
			fieldInfo: '=fieldInfo'
		}
		,
		template: '<label for="{{ fieldInfo.name }}">{{ fieldInfo.label }}</label>'
					+ '<select name="{{ fieldInfo.name }}" id="{{ fieldInfo.name }}" ng-model="fieldInfo.value" ng-options="answer.label for answer in fieldInfo.answers">'
					+ '	<option value="" >Choose a city</option>'
					+ '</select>'
		,
		link: function(scope, element, attrs) {
			scope.newValue = function(value) {
			     $log.log(value);
			}
		}
  	};
})


.directive('numbersOnly', function($log){
	return {
		require: 'ngModel'
		,
		scope:{
			max : '@max',
			min : '@min'
		}
		,
		link: function(scope, element, attrs, mainController) {
			mainController.$parsers.push(function (inputValue) {
				// this next if is necessary for when using ng-required on your input. 
				// In such cases, when a letter is typed first, this parser will be called
				// again, and the 2nd time, the value will be undefined
				$log.log("inputValue: '" + inputValue + "'");
				$log.log("scope.max" + scope.max)
				if (inputValue == undefined) return '' 
				var transformedInput = inputValue.replace(/[^0-9]/g, '');

				if (transformedInput!=inputValue) {
					$log.log("going to update value to " + transformedInput);
					mainController.$setViewValue(transformedInput);
					mainController.$render();
				}

				var isValid = true;
				if (parseInt(inputValue) <= parseInt(scope.min))
				{
					isValid = false;
				}
				if (parseInt(inputValue) >= parseInt(scope.max))
				{
					isValid = false;	
				}
				mainController.$setValidity('numbersOnly', isValid);

				return transformedInput;         
			});
		}
	};
});