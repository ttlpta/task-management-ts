import { unwrapResult } from '@reduxjs/toolkit';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect, useState } from 'react';
import { showAlert } from '../../redux/slices/uiSlice';
import TextFieldForm from '../Form/TextField';
import Form from '../Form/Form';
import {
  createTask,
  getTaskById,
  selectTaskById,
  updateTask,
} from '../../redux/slices/taskSlice';

import { CreateTaskSchema, ICreateTaskSchema } from '../../schemas';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CreateTaskRequestForm } from '../../type/api';
import { Task } from '../../type/model';

type CreateTaskDialogProps = {
  open: boolean;
  handleClose: () => void;
  taskId: number | null
};

export default function CreateTaskDialog({
  open,
  handleClose: close,
  taskId = null,
}: CreateTaskDialogProps) {
  const dispatch = useAppDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const task = useAppSelector((state) => selectTaskById(state, taskId as number));
  const handleSubmit = async (data: CreateTaskRequestForm) => {
    try {
      setFormLoading(true);
      const result = task
        ? await dispatch(updateTask({ id: task.id, ...data }))
        : await dispatch(createTask(data));
      unwrapResult(result);
      dispatch(
        showAlert({
          show: true,
          message: 'Created success',
          type: 'success',
        }),
      );
      close();
    } catch (error) {
      dispatch(
        showAlert({
          show: true,
          message: error.message,
          type: 'error',
        }),
      );
    } finally {
      setFormLoading(false);
    }
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    if (taskId) {
      setFormLoading(true);
      dispatch(getTaskById(taskId)).finally(() => {
        setFormLoading(false);
      });
    }
  }, [taskId, dispatch]);
  const defaultValue = task
    ? {
      name: task.name,
      authorID: task.authorID, // @TODO: sau nay se thay thanh Select, value la id, option la string
      ownerId: task.ownerId,
      categoryId: task.categoryId,
      description: task.description,
    } as ICreateTaskSchema
    : {} as ICreateTaskSchema;

  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth="sm"
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Form<Task, ICreateTaskSchema>
        defaultValues={defaultValue}
        loading={formLoading}
        onSubmit={handleSubmit}
        schema={CreateTaskSchema}
      >
        <DialogTitle id="form-dialog-title">
          {task ? `Edit task ${task.name}` : 'Add new task'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextFieldForm name="name" label="Name" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextFieldForm name="authorID" label="Author" fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextFieldForm name="ownerId" label="Owner" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextFieldForm name="categoryId" label="Category" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextFieldForm
                multiline
                rows={4}
                name="description"
                label="Description"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="secondary">
            Save
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
