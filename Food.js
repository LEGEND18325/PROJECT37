class Food{

constructor(){
    this.foodstock=20;
    this.lastfed;
    this.image=loadImage("images/Milk.png");

}
updateFoodStock(foodstock){
    this.foodstock= foodstock;
    return this.foodstock;
}
getFedTime(lastfed){
    this.lastfed=lastfed;
}

deductFood(foodStock){
    if(foodStock >0){
        this.foodstock=foodStock-1
    }
    
}

getFoodStock(){
    //this.foodstock= foodstock+1;
    return this.foodstock;
}

display(){
    var x=80,y=100;

    imageMode(CENTER);
    image(this.image,720,220,70,70);

    if(this.foodstock!=0){
        for(var i=0;i<this.foodstock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
}

             image(this.image,x,y,50,50);
             x=x+30;
}
}
}


garden(){
background(garden,550,500);

}

washroom(){
    background(washroom,550,500);
}

bedroom(){
    background(bedroom,550,500);
}



}