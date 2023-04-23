import * as React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import { GIOHeader } from "../components/Header";

export function GIOContentLayout() {
	return <ContentLayout header={<GIOHeader />}></ContentLayout>;
}
