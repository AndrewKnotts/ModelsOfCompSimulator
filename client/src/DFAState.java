import java.util.*;
public class DFAState {
    public String name;
    public boolean accepting;
    public boolean connected;
    public List<DFAState> conn;

    public DFAState() {
        conn = new ArrayList<DFAState>();
        connected = false;
    }

    public DFAState(String _name) {
        name = _name;
        conn = new ArrayList<DFAState>();
        connected = false;
    }

    public boolean equals(DFAState other) {
        if (other.name != name) return false;
        //if (!other.conn.equals(conn)) return false;
        //return ((accepting && other.accepting) && (connected && other.connected));
        return true;
    }

}
