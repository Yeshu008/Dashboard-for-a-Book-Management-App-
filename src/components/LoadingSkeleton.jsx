import React from 'react';
import {
  Card,
  CardContent,
  Skeleton,
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

export const StatsCardSkeleton = () => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton variant="text" width="40%" height={32} />
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const FiltersSkeleton = () => (
  <Card sx={{ p: 2 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Skeleton variant="rounded" height={56} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={56} />
      </Grid>
      <Grid item xs={12} md={3}>
        <Skeleton variant="rounded" height={56} />
      </Grid>
      <Grid item xs={12} md={2}>
        <Skeleton variant="rounded" height={56} />
      </Grid>
    </Grid>
  </Card>
);

export const BookTableSkeleton = ({ rows = 10 }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
          <TableCell><Skeleton variant="text" /></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton variant="text" width="80%" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="90%" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="70%" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="60%" />
            </TableCell>
            <TableCell>
              <Skeleton variant="rounded" width={80} height={24} />
            </TableCell>
            <TableCell>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" width={32} height={32} />
                <Skeleton variant="rounded" width={32} height={32} />
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export const BookGridSkeleton = ({ items = 12 }) => (
  <Grid container spacing={3}>
    {Array.from({ length: items }).map((_, index) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <Card>
          <CardContent>
            <Skeleton variant="text" height={28} width="80%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="60%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="50%" sx={{ mb: 1 }} />
            <Skeleton variant="text" height={20} width="40%" sx={{ mb: 2 }} />
            <Skeleton variant="rounded" height={24} width="30%" sx={{ mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Skeleton variant="rounded" width={32} height={32} />
              <Skeleton variant="rounded" width={32} height={32} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export const FormSkeleton = () => (
  <Card>
    <CardContent sx={{ p: 3 }}>
      <Skeleton variant="text" height={32} width="40%" sx={{ mb: 3 }} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Skeleton variant="rounded" height={56} />
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Skeleton variant="rounded" width={100} height={40} />
        <Skeleton variant="rounded" width={100} height={40} />
      </Box>
    </CardContent>
  </Card>
);

export const EmptyStateSkeleton = () => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
    <Skeleton variant="text" height={32} width="40%" sx={{ mx: 'auto', mb: 1 }} />
    <Skeleton variant="text" height={20} width="60%" sx={{ mx: 'auto' }} />
  </Box>
);

export default {
  StatsCardSkeleton,
  FiltersSkeleton,
  BookTableSkeleton,
  BookGridSkeleton,
  FormSkeleton,
  EmptyStateSkeleton,
};