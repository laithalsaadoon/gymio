import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import ColumnLayout from "@awsui/components-react/column-layout";
import PieChart from "@awsui/components-react/pie-chart";
import { dispatch, useStoreState } from "state";
import { LineChart, ProgressBar } from "@awsui/components-react";

export function MyPieChart() {
    const filter = useStoreState('filters');

    const data = [
        {
            title: "A",
            value: 5,
        },
        {
            title: "B",
            value: 1,
        },
        {
            title: "C",
            value: 1,
        }];

    const setFilters = (segments) => {
        const newFilter = segments.map((segment) => data.indexOf(segment));


        dispatch({ type: "setFilters", filters: newFilter });
    }
    return (
        <PieChart
            data={data}
            onFilterChange={(event) => setFilters(event.detail.visibleSegments)}
            visibleSegments={data.filter((_, index) => filter.includes(index))}
        />);
};

const styles = {
    tr: {
        border: "1px solid rgb(204,204,204)",
        borderRadius: "0px 16px 16px 16px",
        backgroundColor: "rgb(221,225,255)",
        paddingLeft: "16px",
        paddingRight: "16px",
        paddingTop: "2px",
        paddingBottom: "2px",
        borderCollapse: "separate",
        borderSpacing: "0 1px",
        display: "flex",
    }
};

function FitnessRow(props) {
    const { title, value } = props;
    return (
        <div style={styles.tr}>
            <div style={{ flexGrow: 1, textAlign: "left" }}>{title}</div>
            <div style={{ flexGrow: 1, textAlign: "right" }}>{value}</div>
        </div>);
};

function MyTable(props) {
    return (
        <ColumnLayout
            columns={1}
        >
            {[
                { title: "Target heart rate", value: 170 },
                { title: "Heart rate", value: 170 }
            ].map((content) => (
                <FitnessRow
                    title={content.title}
                    value={content.value}
                />
            ))}
        </ColumnLayout>
    )
}

export default function Home() {


    return (
        <Container header={<Header variant={"h1"}>Dashboard</Header>}>
            <ColumnLayout
                borders="horizontal"
                columns={4}
            >

                <MyTable />
                <MyPieChart />
            </ColumnLayout>
        </Container >
    );
}
