import Container from "@awsui/components-react/container";
import Header from "@awsui/components-react/header";
import ColumnLayout from "@awsui/components-react/column-layout";
import PieChart from "@awsui/components-react/pie-chart";
import { dispatch, useStoreState } from "state";
import { useState } from "react";
import Modal from "@awsui/components-react/modal";

export default function NotFound() {
    const filter = useStoreState('filters');
    const [data, setData] = useState([
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
        }]);

    const setFilters = (segments) => {
        const newFilter = segments.map((segment) => data.indexOf(segment));


        dispatch({ type: "setFilters", filters: newFilter });
    };



    return (
        <Container header={<Header variant={"h1"}>Not implemented</Header>}>
            <Modal visible={false} children={<PieChart
                data={data}
                onFilterChange={(event) => setFilters(event.detail.visibleSegments)}
                visibleSegments={data.filter((_, index) => filter.includes(index))}
            />}>

            </Modal>
            {/* <ColumnLayout columns={2}> */}

            {/* <PieChart
                    data={[
                        {
                            title: "Not implemented",
                            value: 5,
                        },
                        {
                            title: "Not implemented",
                            value: 1,
                        },
                        {
                            title: "Not implemented",
                            value: 1,
                        }]}
                /> */}
            {/* </ColumnLayout> */}

        </Container>
    );
}
