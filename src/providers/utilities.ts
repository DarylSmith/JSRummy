import { Injectable } from '@angular/core';

@Injectable()
export  class Utilities{

    public static MoveItemInArray (old_index:number, new_index:number, target:any[]) {
    if (new_index >= target.length) {
        var k = new_index - target.length;
        while ((k--) + 1) {
           target.push(undefined);
        }
    }
    target.splice(new_index, 0, target.splice(old_index, 1)[0]);
    return target; 
};


}