import {useParams} from "react-router-dom";
import {findProject} from "../../database/queries/ProjectQueries";
import {ProjectsActionType} from "../../context/projects/ProjectsReducer";
import {useContext, useEffect} from "react";
import {ProjectsContext} from "../../context/projects/ProjectsProvider";
import {TasksList} from "../../components/tasks/TasksList";
import {StatusValues} from "../../enums/StatusValues";

export function Kanban() {
    const [state, dispatch] = useContext(ProjectsContext);
    const { projectId } = useParams();

    const loadProject = async () => {
        dispatch({
            type: ProjectsActionType.SET_LOADING,
            payload: true
        })
        if (projectId) {
            try {
                const [projectFound, data] = await findProject(projectId);
                if (projectFound && data) {
                    dispatch({
                        type: ProjectsActionType.SET_CURRENT_PROJECT,
                        payload: state.projects.filter((p) => p.id === projectFound.id)[0]
                    })
                }
            } catch (e) {
                console.error(e)
            } finally {
                dispatch({
                    type: ProjectsActionType.SET_LOADING,
                    payload: true
                })
            }
        } else {
            console.error("Project ID not found")
        }
    }

    useEffect(() => {
        loadProject()
            .then()
            .catch(e => console.error(e))
    }, [])

    return (
        <div className="kanban">
            <div className="tasklists">
                <TasksList status={StatusValues.TODO} tasks={state.currentProject?.tasks}/>
                <TasksList status={StatusValues.IN_PROGRESS} tasks={state.currentProject?.tasks}/>
                <TasksList status={StatusValues.DONE} tasks={state.currentProject?.tasks}/>
            </div>
        </div>
    )
}