public class Transition {

    public String symbol;
    public DFAState end;
    public DFAState start;

    public Transition (String _symbol,  DFAState _start, DFAState _end) {
        symbol = _symbol;
        end = _end;
        start = _start;
    }

    public void setSymbol(String newSymbol) {
        symbol = newSymbol;
    }
    public String getSymbol() {
        return symbol;
    }
    public DFAState getStart() {
        return start;
    }
    public DFAState getEnd() {
        return end;
    }

    public boolean equals(Transition other) {
        if (other.symbol != symbol) return false;
        if (end.equals(other.end) == false) return false;
        if (start.equals(other.start) == false) return false;

        return true;
    }

}
