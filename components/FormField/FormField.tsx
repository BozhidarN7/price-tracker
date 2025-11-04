import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '@/contexts/ThemeContext';

import { Theme } from '@/types';

type FormFieldProps = {
  label: string;
  icon: React.ReactNode;
  required?: boolean;
};

export default function FormField({
  label,
  icon,
  required,
  children,
}: FormFieldProps & React.PropsWithChildren) {
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.fieldContainer}>
      <View style={styles.fieldHeader}>
        <View style={styles.fieldLabelContainer}>
          {icon}
          <Text style={styles.fieldLabel}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        </View>
      </View>
      {children}
    </View>
  );
}

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    fieldContainer: {
      marginBottom: 20,
    },
    fieldHeader: {
      marginBottom: 8,
    },
    fieldLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    fieldLabel: {
      fontSize: 14,
      fontFamily: 'Inter_600SemiBold',
      color: theme.textPrimary,
      marginLeft: 8,
    },
    required: {
      color: theme.trendDown,
    },
  });
};
