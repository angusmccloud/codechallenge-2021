import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {Text, Button} from 'components';
import {Styles, Typography, Colors} from 'styles';
import {eIcons, iCalcHistory} from 'models';
import {
  calculate,
  setCalculatorHistory,
  getCalculatorHistory,
  displayDate,
} from 'utils';

const TaskOneScreen = ({route, navigation}): React.ReactElement => {
  const [formula, setFormula] = useState('');
  const emptyHistory: iCalcHistory[] = [];
  const [history, setHistory] = useState(emptyHistory);

  let allowDecimal = true;
  const formulaArray = formula.split(' ');
  const lastValue = formulaArray[formulaArray.length - 1];
  if (lastValue !== '') {
    if (lastValue.includes('.')) {
      allowDecimal = false;
    }
  }

  let calculatable = true;
  if (formulaArray.length < 3 || formula.substr(-1) === ' ') {
    calculatable = false;
  }

  const loadHistory = async () => {
    setHistory(await getCalculatorHistory());
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const buttonPress = (button: string | number) => {
    if (typeof button === 'number') {
      setFormula(formula + button.toString());
    } else if (button === '%' || button === 'x' || button === '+') {
      if (formula.length > 0) {
        if (
          formula.substr(-3) === ' % ' ||
          formula.substr(-3) === ' x ' ||
          formula.substr(-3) === ' - ' ||
          formula.substr(-3) === ' + '
        ) {
          setFormula(`${formula.substr(0, formula.length - 3)} ${button} `);
        } else {
          setFormula(`${formula} ${button} `);
        }
      }
    } else if (button === '-') {
      if (formula.substr(-3) === ' + ') {
        setFormula(`${formula.substr(0, formula.length - 3)} ${button} `);
      } else if (formula.substr(-3) !== ' - ') {
        setFormula(`${formula} ${button} `);
      }
    } else if (button === '.') {
      if (allowDecimal) {
        setFormula(`${formula}.`);
      }
    } else if (button === 'backspace') {
      if (formula.length > 0) {
        if (formula.substr(-1) === ' ') {
          setFormula(formula.substr(0, formula.length - 3));
        } else {
          setFormula(formula.substr(0, formula.length - 1));
        }
      }
    } else if (button === 'clear') {
      setFormula('');
    } else if (button === 'calculate') {
      let formattedFormula = formula.split('%').join('/').split('x').join('*');
      const result = calculate(formattedFormula);
      // Log it in Async
      const timestamp = new Date();
      setCalculatorHistory(formula, result, timestamp, history);
      setFormula(result.toString());
    }
  };

  const renderItem = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => setFormula(item.result.toString())}>
      <View style={Styles.sectionWrapper}>
        <Text size="XXS">{displayDate(new Date(item.timestamp))}</Text>
        <Text size="M">
          {item.formula} = {item.result}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  const renderHeader = () => (
    <View style={{padding: 10, paddingBottom: 0, alignItems: 'center'}}>
      {history.length > 0 && <Text bold>Calculator History</Text>}
    </View>
  );

  return (
    <SafeAreaView>
      <View style={Styles.body}>
        <View style={[Styles.sectionWrapper, {marginTop: 10}]}>
          <Text size="L">{formula}</Text>
        </View>
        <View style={Styles.calculatorRow}>
          <Button
            onPress={() => buttonPress(7)}
            text="7"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress(8)}
            text="8"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress(9)}
            text="9"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress('+')}
            text="+"
            buttonStyle="calculatorSecondary"
            size="Large"
            disabled={formula.length === 0}
          />
        </View>
        <View style={Styles.calculatorRow}>
          <Button
            onPress={() => buttonPress(4)}
            text="4"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress(5)}
            text="5"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress(6)}
            text="6"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress('-')}
            text="-"
            buttonStyle="calculatorSecondary"
            size="Large"
          />
        </View>
        <View style={Styles.calculatorRow}>
          <Button
            onPress={() => buttonPress(1)}
            text="1"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress(2)}
            text="2"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress(3)}
            text="3"
            buttonStyle="calculatorPrimary"
            size="Large"
          />
          <Button
            onPress={() => buttonPress('x')}
            text="x"
            buttonStyle="calculatorSecondary"
            size="Large"
            disabled={formula.length === 0}
          />
        </View>
        <View style={Styles.calculatorRow}>
          <Button
            onPress={() => buttonPress('.')}
            text="."
            buttonStyle="calculatorPrimary"
            size="Large"
            disabled={!allowDecimal}
          />
          <Button
            onPress={() => buttonPress(0)}
            text="0"
            buttonStyle="calculatorPrimary"
            size="Large"
            disabled={formula.length === 0}
          />
          <Button
            onPress={() => buttonPress('backspace')}
            text=""
            iconName={eIcons.backspace}
            iconSize={Typography.fontSizeL}
            iconColor={
              formula.length > 0
                ? Colors.buttonHollowText
                : Colors.buttonHollowDisabledText
            }
            buttonStyle="calculatorSecondary"
            size="Large"
            disabled={formula.length === 0}
          />
          <Button
            onPress={() => buttonPress('%')}
            text="%"
            buttonStyle="calculatorSecondary"
            size="Large"
            disabled={formula.length === 0}
          />
        </View>
        <View style={Styles.calculatorRow}>
          <Button
            onPress={() => buttonPress('clear')}
            text="Clear"
            buttonStyle="calculatorSecondaryWide"
            size="Large"
            disabled={formula.length === 0}
          />
          <Button
            onPress={() => buttonPress('calculate')}
            text="Calculate"
            buttonStyle="calculatorSecondaryWide"
            size="Large"
            disabled={!calculatable}
          />
        </View>
        <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          ListHeaderComponent={renderHeader}
        />
      </View>
    </SafeAreaView>
  );
};

export default TaskOneScreen;
