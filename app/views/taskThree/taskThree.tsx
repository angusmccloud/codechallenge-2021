import React, {useState} from 'react';
import {SafeAreaView, View, TouchableWithoutFeedback} from 'react-native';
import {Text, Button, Icon} from 'components';
import {Styles} from 'styles';
import {eIcons} from 'models';

const TaskThreeScreen = ({route, navigation}): React.ReactElement => {
  const [active, setActive] = useState(true);

  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <View style={Styles.textOnlyWrapper}>
          <View style={{paddingBottom: 20}}>
            <Text size="XXL" bold>
              Task 3
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TaskThreeScreen;
