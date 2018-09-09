import * as React from 'react';
import { ManagerNavComponent } from '../nav/manager.nav.component';

export class ManagerMainComponent extends React.Component<any,any> {
    constructor(props:any){
        super(props);
    }
    public render() {
        return (
            <div>
                <ManagerNavComponent/>
            </div>
        );
    }
}