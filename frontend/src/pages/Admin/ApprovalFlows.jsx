import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  IconButton
} from '@mui/material';
import { PlusCircle, CreditCard as Edit, Trash2, GitBranch } from 'lucide-react';

export const ApprovalFlows = () => {
  const [flows, setFlows] = useState([
    {
      id: '1',
      name: 'Standard Approval',
      description: 'Manager approval required',
      steps: [
        { id: '1', stepOrder: 1, approverRole: 'manager' }
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'High Value Approval',
      description: 'Manager and Admin approval required',
      steps: [
        { id: '2', stepOrder: 1, approverRole: 'manager' },
        { id: '3', stepOrder: 2, approverRole: 'admin' }
      ],
      isActive: true
    }
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentFlow, setCurrentFlow] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    steps: [{ stepOrder: 1, approverRole: 'manager' }],
    isActive: true
  });

  const handleAdd = () => {
    setEditMode(false);
    setFormData({
      name: '',
      description: '',
      steps: [{ stepOrder: 1, approverRole: 'manager' }],
      isActive: true
    });
    setDialogOpen(true);
  };

  const handleEdit = (flow) => {
    setEditMode(true);
    setCurrentFlow(flow);
    setFormData({
      name: flow.name,
      description: flow.description,
      steps: flow.steps.map(s => ({ stepOrder: s.stepOrder, approverRole: s.approverRole })),
      isActive: flow.isActive
    });
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setFlows(flows.filter(f => f.id !== id));
  };

  const handleSave = () => {
    if (editMode && currentFlow) {
      setFlows(
        flows.map(f =>
          f.id === currentFlow.id
            ? {
                ...f,
                ...formData,
                steps: formData.steps.map((s, i) => ({
                  ...s,
                  id: (i + 1).toString()
                }))
              }
            : f
        )
      );
    } else {
      const newFlow = {
        id: Date.now().toString(),
        ...formData,
        steps: formData.steps.map((s, i) => ({
          ...s,
          id: (i + 1).toString()
        }))
      };
      setFlows([...flows, newFlow]);
    }
    setDialogOpen(false);
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        { stepOrder: formData.steps.length + 1, approverRole: 'manager' }
      ]
    });
  };

  const removeStep = (index) => {
    const newSteps = formData.steps.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      steps: newSteps.map((s, i) => ({ ...s, stepOrder: i + 1 }))
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Approval Flows</h1>
          <p className="text-gray-600 mt-2">Configure multi-step approval workflows</p>
        </div>
        <Button
          variant="contained"
          startIcon={<PlusCircle className="w-5 h-5" />}
          onClick={handleAdd}
          sx={{
            bgcolor: 'rgb(37, 99, 235)',
            '&:hover': { bgcolor: 'rgb(29, 78, 216)' },
            textTransform: 'none'
          }}
        >
          Create Flow
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {flows.map((flow) => (
          <Card key={flow.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <GitBranch className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{flow.name}</h3>
                    <p className="text-sm text-gray-600">{flow.description}</p>
                  </div>
                </div>
                <Chip
                  label={flow.isActive ? 'Active' : 'Inactive'}
                  color={flow.isActive ? 'success' : 'default'}
                  size="small"
                />
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium text-gray-700">Approval Steps:</p>
                {flow.steps.map((step) => (
                  <div
                    key={step.id}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold">
                      {step.stepOrder}
                    </div>
                    <span className="text-sm text-gray-700 capitalize">
                      {step.approverRole} Approval
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<Edit className="w-4 h-4" />}
                  onClick={() => handleEdit(flow)}
                  sx={{ textTransform: 'none', flex: 1 }}
                >
                  Edit
                </Button>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(flow.id)}
                  sx={{ color: 'rgb(239, 68, 68)' }}
                >
                  <Trash2 className="w-4 h-4" />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editMode ? 'Edit Approval Flow' : 'Create Approval Flow'}</DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-4">
            <TextField
              fullWidth
              label="Flow Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />

            <div>
              <div className="flex justify-between items-center mb-3">
                <p className="font-medium text-gray-900">Approval Steps</p>
                <Button
                  size="small"
                  onClick={addStep}
                  sx={{ textTransform: 'none' }}
                >
                  Add Step
                </Button>
              </div>

              <div className="space-y-3">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                      {step.stepOrder}
                    </div>
                    <FormControl fullWidth>
                      <InputLabel>Approver Role</InputLabel>
                      <Select
                        value={step.approverRole}
                        label="Approver Role"
                        onChange={(e) => {
                          const newSteps = [...formData.steps];
                          newSteps[index].approverRole = e.target.value;
                          setFormData({ ...formData, steps: newSteps });
                        }}
                      >
                        <MenuItem value="manager">Manager</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                    {formData.steps.length > 1 && (
                      <IconButton
                        onClick={() => removeStep(index)}
                        sx={{ color: 'rgb(239, 68, 68)' }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </IconButton>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} sx={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: 'rgb(37, 99, 235)',
              '&:hover': { bgcolor: 'rgb(29, 78, 216)' },
              textTransform: 'none'
            }}
          >
            {editMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};