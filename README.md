
# image-enlarger

## Include the service 'ImageEnlarger' in your angular.js controller
Note: Some of the selectors may need to be updated per your project in this .js


### Markup && Sass

```
<figure class="img-enlarge">
    <div class="image-wrapper">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Large_breaking_wave.jpg">
    </div>
</figure>
```

```
/*------------------------------------------------*/
/*----------------[Image Enlarge]-----------------*/
/*------------------------------------------------*/

.img-enlarge{
  //cursor: zoom-in;
  cursor: url(../images/icon-zoom.svg), auto;
  &.enlarged{
    //cursor: zoom-out;
    cursor: url(../images/icon-zoom-out.svg), auto;
    img{
      display: inline-block;
      padding: 0;
      position: relative;
      vertical-align: middle;
      //width: 720px;
      width: 85%;
      z-index: 1000;
    }
    .overlay{
      background-color: #e2e8ec;
      height: 100vh;
      left: 0;
      opacity: .8;
      position: fixed;
      top: 0;
      width: 100vw;
      z-index: 999;
    }
  }

  img,
  .overlay{
    transition: all .3s ease;
  }
}
```
