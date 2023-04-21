import * as React from "react";
import ContentLayout from "@cloudscape-design/components/content-layout";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import { GIOHeader } from "./Header";

export function GIOContentLayout() {
	return <ContentLayout header={<GIOHeader />}></ContentLayout>;
}
