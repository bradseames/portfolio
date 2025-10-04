import PageHeader from '../components/Layouts/PageHeader'
import {Outlet} from "react-router";
import classes from './DashboardLayout.module.css'
import {AppShell, Container} from "@mantine/core";

export default function DashboardLayout() {
    return (
        <AppShell header={{height: 60}}>
            <AppShell.Header>
                <PageHeader/>
            </AppShell.Header>

            <AppShell.Main className={classes.main}>
                <Container className={classes.contents}>
                    <Outlet/>
                </Container>


            </AppShell.Main>
        </AppShell>



        // </div>
    );
}

