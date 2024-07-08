// Define the Style interface
   interface Style {
    d3Attributes: { [key: string]: any };
    shapeName: string;
    styleName: string;

    setPosition : (x:number,y:number) => void;
    setAttribute:(key:string,value:string) => void
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

    setAttribute (key: string, value: any){
      (this.d3Attributes as any)[key]=value;
    }
  }
  



  class RectangleStyle implements Style {
    d3Attributes = { fill: 'blue', width:50,height:50 };
    shapeName = 'rect';
    styleName = 'Blue Rectangle';

    setPosition(x:number,y:number){
      //updates the x y position
      this.d3Attributes = {...this.d3Attributes, ...{x:x, y:y}}
    }

    setAttribute (key: string, value: any){
      (this.d3Attributes as any)[key]=value;
    }
  }






  class SelectionStyle implements Style {
    d3Attributes = { 
      fill: 'none',
      stroke : "gray",
      "stroke-dasharray": '10,20',
      width:1,
      height:1
    };
    shapeName = 'rect';
    styleName = 'Blue Rectangle';

    setPosition(x:number,y:number){
      //updates the x y position
      this.d3Attributes = {...this.d3Attributes, ...{x:x, y:y}}
    }
    
    setAttribute (key: string, value: any){
      (this.d3Attributes as any)[key]=value;
    }
  }



  


  export type {Style}
  export {CircleStyle, RectangleStyle,SelectionStyle }

