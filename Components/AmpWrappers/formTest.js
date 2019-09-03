<form class="sample-form hide-inputs" method="post" action-xhr="/documentation/examples/api/submit-form-input-text-xhr" target="_top"> <input type="text" name="name" placeholder="Name..." required> <input type="submit" value="Subscribe"> <div submit-success> Success! </div> <div submit-error> Error! </div>
</form>

<p [text]="'Hello ' + foo">Hello World</p> <button on="tap:AMP.setState({foo: 'amp-bind'})">Say "Hello amp-bind"</button>


<!-- Store complex nested JSON data in <amp-state> elements. -->

<amp-state id="myAnimals"> <script type="application/json"> { "dog": { "imageUrl": "/img/dog.jpg", "style": "greenBackground" }, "cat": { "imageUrl": "/img/cat.jpg", "style": "redBackground" } } </script>
</amp-state> <p [text]="'This is a ' + currentAnimal + '.'">This is a dog.</p> <!-- CSS classes can also be added or removed with [class]. -->
<p class="greenBackground" [class]="myAnimals[currentAnimal].style"> Each animal has a different background color.
</p> <!-- Or change an image's src with the [src] binding. -->
<amp-img width="300" height="200" src="/img/dog.jpg" [src]="myAnimals[currentAnimal].imageUrl">
</amp-img> <button on="tap:AMP.setState({currentAnimal: 'cat'})">Set to Cat</button>
