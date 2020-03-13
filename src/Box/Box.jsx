import React, {Component} from 'react';
import './Box.css';

export default class Box extends Component
{
    render()
    {
        console.log("render box");
        let {row, col, top, left, right, bottom, curr, vissited, back, onClick} = this.props;
        curr = curr ? "current": "";
        vissited = vissited ? "vissited" : "";
        top = top ? "top-ture": "top-false";
        left = left ? "left-ture": "left-false";
        right = right ? "right-ture": "right-false";
        bottom = bottom ? "bottom-ture" : "bottom-false";
        back = back ? "back" : "";
        return(
            <div className={`${top} ${left} ${right} ${bottom} ${vissited} ${curr} ${back} box-margin`}
                 onClick={()=> onClick()}></div>
        );
    }
}