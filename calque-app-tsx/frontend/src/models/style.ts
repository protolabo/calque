// Define the Style interface
   interface Style {
    d3Attributes: { [key: string]: any };
    shapeName: string;
    styleName: string;

    setPosition : (x:number,y:number) => void;
    setPositionOnClick:(x:number,y:number) => void;
  }
  


  // Implement different styles for different default cases
  class CircleStyle implements Style {
    d3Attributes = { fill: 'red', r:25 };
    shapeName = 'circle';
    styleName = 'Red Circle';

    setPosition(x:number,y:number){
      //updates the x y position
      this.d3Attributes = {...this.d3Attributes, ...{cx:x, cy:y}}
    }
    setPositionOnClick(x:number,y:number){
      this.setPosition(x,y)
    }
  }
  



  class RectangleStyle implements Style {
    d3Attributes = { fill: 'blue', width:50,height:50 };
    shapeName = 'rect';
    styleName = 'Blue Rectangle';

    setPosition(x:number,y:number){
      //updates the x y position
      this.d3Attributes = {...this.d3Attributes, ...{cx:x, cy:y}}
    }
    setPositionOnClick(x:number,y:number){
      this.setPosition(x - this.d3Attributes.width/2,y-this.d3Attributes.height/2)
    }
  }






  class SelectionStyle implements Style {
    d3Attributes = { 
      fill: 'none',
      stroke : "cyan",
      "stroke-dasharray": '("3,3")',
      width:1,
      height:1
    };
    shapeName = 'rect';
    styleName = 'Blue Rectangle';

    setPosition(x:number,y:number){
      //updates the x y position
      this.d3Attributes = {...this.d3Attributes, ...{cx:x, cy:y}}
    }
    setPositionOnClick(x:number,y:number){
      this.setPosition(x - this.d3Attributes.width/2,y-this.d3Attributes.height/2)
    }
  }



  


  export type {Style}
  export {CircleStyle, RectangleStyle,SelectionStyle }

