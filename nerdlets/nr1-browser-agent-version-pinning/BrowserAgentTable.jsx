import React, { useEffect, useState } from 'react';
import scrapeBrowserAgentData from './scrape';
import { Badge, Table, TableHeader, TableHeaderCell, TableRow, TableRowCell } from 'nr1';

const BrowserAgentTable = ({ currentPinnedVersion, onUpdateVersion }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // TODO: Handle errors
            const result = await scrapeBrowserAgentData();
            setData(result);
        };

        fetchData();
    }, []);

    const getActions = (itemVersion) => {
        return [
            {
                label: 'Pin Version',
                disabled: itemVersion === currentPinnedVersion,
                onClick: (_, { item }) => {
                    onUpdateVersion(item.version);
                },
            },
            {
                label: 'Remove Pinning',
                type: TableRow.ACTION_TYPE.DESTRUCTIVE,
                disabled: itemVersion !== currentPinnedVersion,
                onClick: () => {
                    onUpdateVersion(null);
                },
            },
        ];
    };
    return (
        <React.Fragment>
            <Table items={data}>
                <TableHeader>
                    <TableHeaderCell value={({ item }) => item.version}>Version</TableHeaderCell>
                    <TableHeaderCell value={({ item }) => item.startDate}>Support Start Date</TableHeaderCell>
                    <TableHeaderCell value={({ item }) => item.endDate}>Support End Date</TableHeaderCell>
                </TableHeader>

                {({ item }) => (
                    <TableRow actions={getActions(item.version)}>
                        <TableRowCell>
                            {item.version}{' '}
                            {currentPinnedVersion === item.version && <Badge type={Badge.TYPE.SUCCESS}>Current</Badge>}
                        </TableRowCell>
                        <TableRowCell>
                            {item.startDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </TableRowCell>
                        <TableRowCell>
                            {item.endDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </TableRowCell>
                    </TableRow>
                )}
            </Table>
        </React.Fragment>
    );
};

export default BrowserAgentTable;
