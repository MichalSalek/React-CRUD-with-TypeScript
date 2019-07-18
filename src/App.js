import React from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

function App() {
  return (
    <Card>
      <CardHeader title="Books app" />
      <CardContent>
        <Typography>Hello books!</Typography>
      </CardContent>
    </Card>
  );
}

export default App;
