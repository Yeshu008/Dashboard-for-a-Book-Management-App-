import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  useTheme,
} from '@mui/material';
import {
  Book as BookIcon,
  CheckCircle as AvailableIcon,
  Cancel as IssuedIcon,
  Category as GenreIcon,
  Person as AuthorIcon,
} from '@mui/icons-material';
import { useBookStats } from '../hooks/useBooks';
import { StatsCardSkeleton } from './LoadingSkeleton';

const StatCard = ({ title, value, icon, color, subtitle }) => {
  const theme = useTheme();
  
  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar
            sx={{
              backgroundColor: color,
              width: 48,
              height: 48,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: 500, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 700, lineHeight: 1, mb: subtitle ? 0.5 : 0 }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="textSecondary">
                {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const BookStats = () => {
  const { stats, isLoading, error } = useBookStats();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <StatsCardSkeleton />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (error) {
    return null; 
  }

  const statCards = [
    {
      title: 'Total Books',
      value: stats.total,
      icon: <BookIcon />,
      color: theme.palette.primary.main,
      subtitle: 'books in library',
    },
    {
      title: 'Available',
      value: stats.available,
      icon: <AvailableIcon />,
      color: theme.palette.success.main,
      subtitle: 'ready to borrow',
    },
    {
      title: 'Issued',
      value: stats.issued,
      icon: <IssuedIcon />,
      color: theme.palette.warning.main,
      subtitle: 'currently borrowed',
    },
    {
      title: 'Genres',
      value: stats.genres,
      icon: <GenreIcon />,
      color: theme.palette.info.main,
      subtitle: 'different categories',
    },
    {
      title: 'Authors',
      value: stats.authors,
      icon: <AuthorIcon />,
      color: theme.palette.secondary.main,
      subtitle: 'unique writers',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 3 }}>
      {statCards.map((stat, index) => (
        <Grid item xs={12} sm={6} md={2.4} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookStats;