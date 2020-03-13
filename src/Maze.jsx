import React, {Component} from 'react';
import Box from './Box/Box';
import './Maze.css'


export default class Maze extends Component
{
    constructor()
    {
        super();
        this.rows = 20;
        this.cols = 20;
        this.stack = [];
        this.state = 
        {
            grid: [],
            currRow: 0,
            currCol: 0,
            pause: true
        };
    }

    componentDidMount()
    {
        const grid = InitializeGrid(this.rows, this.cols);
        grid[0][0].curr = true;
        this.setState({grid});
        console.log("mount");
    }

    updateBox(row, col)
    {
        let currBox = this.getCurr();
        
        currBox.curr = false;
        currBox.vissited = true;
        console.log("row:", row, " col:", col);

        let newBox = this.state.grid[row][col];
        this.removeWalls(currBox, newBox);
        newBox.curr = true;
        this.setState({currRow:row, currCol:col});

        this.stack.push(currBox);
        console.log("updateBox");
        console.log(this.stack);
        
    }

    getCurr()
    {
        return this.state.grid[this.state.currRow][this.state.currCol];
    }

    getBox(row, col)
    {
        if(this.inGrid(row, col))
        {
            return this.state.grid[row][col];
        }
        
    }

    inGrid(row, col)
    {
        if(row < 0){return false;}
        if(col < 0){return false;}
        if(row > this.rows-1){return false;}
        if(col > this.cols-1){return false;}
        return true;
    }

    getNeighbors()
    {
        let nighbors = [];
        const top = this.getBox(this.state.currRow-1, this.state.currCol);
        const left = this.getBox(this.state.currRow, this.state.currCol-1);
        const right = this.getBox(this.state.currRow, this.state.currCol+1);
        const bottom = this.getBox(this.state.currRow+1, this.state.currCol);

        if(top && !top.vissited){nighbors.push(top);}
        if(left && !left.vissited){nighbors.push(left);}
        if(right && !right.vissited){nighbors.push(right);}
        if(bottom && !bottom.vissited){nighbors.push(bottom);}

        if(nighbors.length > 0)
        {
            let currBox = this.getCurr();
            
            let rand = Math.floor(Math.random() * nighbors.length);
            const nextBox = nighbors[rand];
            this.updateBox(nextBox.row, nextBox.col);
            return true;
        }
        else if (this.stack.length > 0)
        {
            let curr = this.getCurr();
            curr.vissited = true;

            let currBox = this.stack.pop();
            console.log("popped box: ", currBox);
            currBox.back = true;
            this.setState({currRow: currBox.row, currCol: currBox.col});
            currBox.back = false;
            return true;
        }
        return false;

    }

    removeWalls(curr, next)
    {
        if(next.row - curr.row === 1) //remove next-top curr-bottom
        {
            next.top = false;
            curr.bottom = false;
        }
        else if(next.row - curr.row === -1) //remove next-bottom curr-top
        {
            next.bottom = false;
            curr.top = false;
        }
        else if(next.col - curr.col === 1) //remove next-left curr-right
        {
            next.left = false;
            curr.right = false;
        }
        else if(next.col - curr.col === -1)//remove 
        {
            next.right = false;
            curr.left = false;
        }
    }

    start()
    {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.play, 100);
    }

    pause()
    {
        clearInterval(this.intervalId);
    }

    play = () =>
    {
        this.getNeighbors();
    }

    render()
    {
        const {grid} = this.state;
        console.log(grid);
        return(
            <div>
                
                <button onClick={() => this.start()}>START</button>
                <button onClick={() => this.pause()}>PAUSE</button>
                    <div className="grid">
                        {grid.map( (row, rowIndex)  =>{
                                return(
                                    <div key={rowIndex} className="row">
                                        {row.map( (box, boxIndex) => 
                                        {
                                            const {row, col, top, left, right, bottom, curr, vissited, back} = box;

                                            return(
                                                <Box
                                                    key = {boxIndex}
                                                    row = {row}
                                                    col = {col}
                                                    top = {top}
                                                    left = {left}
                                                    right = {right}
                                                    bottom = {bottom}
                                                    curr = {curr}
                                                    vissited = {vissited}
                                                    back = {back}
                                                    onClick={() => this.updateBox(row, col)}
                                                ></Box>
                                            );

                                        })}
                                    </div>
                                );
                            }
                        )}
                    </div>
            </div>
        );
            
    }
}

const InitializeGrid = (rowNum, colNum) =>
{
    const grid = [];

    for(let i = 0; i < rowNum; i++)
    {
        const rowArr = [];
        for(let j = 0; j < colNum; j++)
        {
            const box = createBox(i, j);
            rowArr.push(box);
        }
        grid.push(rowArr);
    }
    return grid;
}

const createBox = (row, col) =>
{
    return{
        col,
        row,
        vissited: false,
        top: true,
        left: true,
        right: true,
        bottom: true,
        curr: false,
        back: false,
    };
};
