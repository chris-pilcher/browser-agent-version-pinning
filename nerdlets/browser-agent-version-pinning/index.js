import React from "react";
import { Card, CardBody, CardHeader, Grid, GridItem, HeadingText, Tabs, TabsItem } from "nr1";
import { BrowserAgentTable, ConfirmationModal, PinningStatus, CustomVersionForm } from "./components";
import { ModalProvider } from "./context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function BrowserAgentVersionPinningNerdlet() {
  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ConfirmationModal />
        {/*TODO: Check if I need a grid component? Feels like I just need a stack*/}
        <Grid>
          <GridItem columnSpan={12}>
            <PinningStatus />
          </GridItem>
          <GridItem columnSpan={12}>
            <Card>
              <CardHeader>
                <HeadingText
                  type={HeadingText.TYPE.HEADING_4}
                  spacingType={[HeadingText.SPACING_TYPE.MEDIUM, HeadingText.SPACING_TYPE.NONE]}>
                  Manage pinning
                </HeadingText>
              </CardHeader>
              <CardBody>
                {/*TODO: should this be a container? Or something else? Basically I want to get this as short as possible */}
                <Tabs defaultValue="supported">
                  <TabsItem value="supported" label="Supported versions">
                    {/*TODO: Check what permissions are required to update pinning. See what it does if I do not have permission. */}
                    <BrowserAgentTable />
                  </TabsItem>
                  <TabsItem value="custom" label="Custom version">
                    <CustomVersionForm />
                  </TabsItem>
                </Tabs>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </ModalProvider>
    </QueryClientProvider>
  );
}
