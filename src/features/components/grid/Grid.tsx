import React, { FunctionComponent, useEffect, useState, useRef } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import { makeStyles, Theme, darken } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store';
import './Grid.scss';

import Module from 'features/components/module/moduleRenderer';

const ResponsiveGridLayout = WidthProvider(GridLayout);

const useStyles = makeStyles(({palette}: Theme) => ({
  grid: {
    '& .react-grid-item': {
      background: palette.background.paper,
    },
    '& .react-grid-item.react-grid-placeholder': {
      background: palette.primary.main,
    },
    '& .react-grid-item .react-resizable-handle::after': {
      borderColor: palette.primary.main,
    },
    '& .react-grid-item.react-draggable-dragging': {
      background: darken(palette.background.paper, 0.075)
    }
  }
}));

const Grid: FunctionComponent = () => {
  const classes = useStyles();

  const dimensions = useSelector(
    (state: RootState) => state.dimension
  );

  const {settings, cells} = useSelector(
    (state: RootState) => state.grid
  );

  // settings have to be pulled from the character grid settings -- implemented
  // margin, cols, rows should be allowed to set by the user -- implemented
  // has to get the width, height of its parent, resize still needs to be trigger manually -- todo
  // - also onResize has to change those values
  let [options, setOptions] = useState<any>();

  let wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let width = wrapperRef.current?.clientWidth || dimensions.width;
    let height = wrapperRef.current?.clientHeight || dimensions.height;

    setOptions({
      autoSize: false,
      margin: [settings.margin, settings.margin] as [number, number], // cast needed for typescript
      cols: settings.columns,
      compactType: null,
      maxRows: settings.rows,
      preventCollision: true,
      width: width,
      rowHeight: (height - ((settings.rows + 1) * settings.margin)) / settings.rows
    });
  }, [wrapperRef, dimensions, settings])

  const handleLayoutChange = () => {
    // update redux grid -> save?
  };

  return (
    <div ref={wrapperRef}>
      <ResponsiveGridLayout
        {...options}
        className={classes.grid}
        layout={cells.map(e => ({i: e.id, x: e.x, y: e.y, w: e.w, h: e.h}))}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={handleLayoutChange}
        >
        {cells.map((e) => (
          <div key={e.id}>
            <Module id={e.module} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
};

export default Grid;