import Cell from '../cell/cell.component';

import './grid.styles.scss';

const Grid = () => {
    const gridPositions = ['a','b','c','d','e','f','g','h','i']

    return (
        <div className='grid'>
        {gridPositions.map((p, i) =>
            <Cell 
                key={i} 
                cellPosition={p} 
            />
        )} 
    </div>          
    )
}

export default Grid;