import * as React from 'react';
import { UserNavComponent } from '../nav/user.nav.component';

export class UserMainComponent extends React.Component<any,any> {
    constructor(props:any){
        super(props);
    }
    public render() {
        return (
            <div>
                <UserNavComponent/>
                

            </div>
        );
    }
}