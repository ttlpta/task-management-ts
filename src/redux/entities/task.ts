import { createEntityAdapter } from '@reduxjs/toolkit';
import { Task } from '../../type/model';

export default createEntityAdapter<Task>();
