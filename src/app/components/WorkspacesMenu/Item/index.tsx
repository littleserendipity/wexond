import React from 'react';

import {
  Root, IconsContainer, Icon, Label, DeleteIcon,
} from './styles';

import Store from '../../../store';
import Workspace from '../../../models/workspace';

export interface Props {
  workspace: Workspace;
}

export default class extends React.Component<Props, {}> {
  public static defaultProps = {
    selected: false,
  };

  public onClick = () => {
    const { workspace } = this.props;
    const { workspaces } = Store;

    workspaces.selected = workspace.id;
  };

  public onDelete = (e?: React.SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const { workspace } = this.props;
    const { workspaces } = Store;

    if (workspaces.list.length > 0) {
      let altWorkspaceIndex = workspace.id + 1;

      if (altWorkspaceIndex >= workspaces.list.length) {
        altWorkspaceIndex = workspace.id - 1;
      }

      const altWorkspace = workspaces.list[altWorkspaceIndex];

      for (let i = 0; i < workspace.tabs.length; i++) {
        altWorkspace.tabs.push(workspace.tabs[i]);
      }

      workspaces.list.splice(workspace.id, 1);
      workspaces.selected = altWorkspaceIndex - 1;
    }
  };

  public render() {
    const { workspace } = this.props;
    const { workspaces } = Store;

    const selected = workspaces.selected === workspace.id;
    const icons = workspace.getIcons();

    return (
      <Root onClick={this.onClick}>
        {workspaces.list.length > 1 && (
          <DeleteIcon className="delete-icon" onClick={this.onDelete} />
        )}
        <IconsContainer selected={selected}>
          {icons != null && icons.map((data: any, key: any) => <Icon key={key} src={data} />)}
        </IconsContainer>
        <Label>{workspace.name}</Label>
      </Root>
    );
  }
}