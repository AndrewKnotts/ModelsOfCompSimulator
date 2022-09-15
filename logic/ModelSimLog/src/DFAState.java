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

}
