import {Grid, Card, Container} from "@mantine/core";
import TableOfContents from "@/components/TableOfContents/TableOfContents";
import Experience from "@/components/Experience/Experience";
import {CarouselCard} from "@/components/CarouselCard/CarouselCard";

export default function Dashboard() {
    return (
        <Grid grow>
            <Grid.Col span={3}>
                <Card>
                    <TableOfContents/>
                </Card>
            </Grid.Col>
            <Grid.Col span={5}>
                <Card>
                    <Experience/>
                </Card>
            </Grid.Col>

            <Grid.Col span={4}>
                <Card>
                    <CarouselCard/>
                </Card>

            </Grid.Col>

        </Grid>
    );
}

